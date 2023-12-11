import { Injectable } from '@angular/core';
import { IFundraiser } from '../../models/fundraiser.model';
import { ICart } from '../../models/cart.model';
import { IUser } from '../../models/user.model';
import { UtilService } from '../util/util.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../event/event.service';
import { ScriptLoaderService } from '../script-loader/script-loader.service';
import { IOrder } from '../../models/order.model';
import { BehaviorSubject } from 'rxjs';
import { IPaymentConfig } from '../../models/payment.model';

declare const Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  captcha_response = '';
  cart_data: any;
  is_contribute_init_event_hit = false;
  public is_order_loading = false;
  otp_verified_token = '';
  payment_config = new BehaviorSubject<IPaymentConfig | null>(null);
  payment_options: any;
  payment_failed_once = new BehaviorSubject<boolean>(false);

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private event: EventService,
    private script: ScriptLoaderService,
    private util: UtilService
  ) { }

  async createCart(data: any): Promise<{ fundraiser: IFundraiser, cart: ICart }> {
    return new Promise((resolve, reject) => {
      this.is_order_loading = true;
      const user: IUser = data?.user || this.util.vars.user_data.getValue();
      const client = this.util.vars.user_location.getValue();
      const payload: any = {
        accessToken: this.otp_verified_token || null,
        campaign_id: data?.campaign_id,
        currency: data?.currency,
        device: this.util.vars.device_type,
        donated_amount: data?.donated_amount,
        donor_country: client?.country_name,
        donor_email: user?.email || data?.email,
        donor_extension: user?.extension || data?.donor_extension,
        donor_name: user?.full_name || data?.donor_name,
        donor_phone: user?.phone_1 || data?.donor_phone,
        donor_pincode: user?.pincode || data?.donor_pincode || '',
        'g-recaptcha-response': this.captcha_response || null,
        is_anonymous: data?.is_anonymous ? '1' : '0',
        skipmin: true,
        ...this.util.getUTMonly()
      };

      const cartPayload = this.util.removeEmptyFromObject(payload);

      const url = environment.APP.API_URLS.POST_AMOUNT_DETAILS(data?.campaign_id);
      this.api.post(url, cartPayload).subscribe(async (cartResponse) => {
        this.cart_data = cartResponse.data;
        this.event.sendClaverTapEvent('Add Money Wallet Step 1', {
          'Amount': payload.donated_amount,
          'Cart ID': this.cart_data.cart.id,
          'ISO Currency': payload.currency
        });
        this.util.storage.checkFromSession('k2_cart', this.cart_data);
        if (cartResponse?.data?.hasOwnProperty('token')) {
          this.util.vars.login_method = 'cart';
          const newUser = await this.auth.userLogin(this.cart_data);
        }
        await this.eventForInitiatePayment();
        await this.eventAfterCreatingCart();
        this.is_order_loading = false;
        this.captcha_response = '';
        this.cart_data = { fundraiser: cartResponse?.data?.campaign, cart: cartResponse?.data?.cart };
        resolve(this.cart_data);
        this.captcha_response = '';
      }, (error) => {
        this.is_order_loading = false;
        this.captcha_response = '';
        reject(true);
      });
    });
  }

  createOrder(data: any) {
    return new Promise((resolve, reject) => {
      this.is_order_loading = true;
      const payload: any = {
        campaign_id: data?.cart?.campaign_id,
        cart_id: data?.cart?.id,
        mode: data?.mode,
        gateway: this.payment_options?.gateway,
        mode_value: data?.mode_value,
        bin: data?.mode === 'CARD' && !data?.customer_id && data?.card_number_fill ? data.card_number_fill.substr(0, 6) : null,
        page_type: this.util.vars.page_name,
        vpa: data?.VPA || '',
        payment_gateway: data?.payment_gateway || '',
        ...this.util.getUTMonly()
      };

      const orderPayload = this.util.removeEmptyFromObject(payload);

      this.api.post(environment.APP.API_URLS.PLACE_ORDER(data?.cart?.campaign_id || data.fundraiser.id), orderPayload).subscribe(async (orderRes) => {
        await this.eventAfterCreatingOrder(orderRes.data, data);
        this.util.storage.checkFromSession(orderRes.data.order_id, data.cart);
        this.sendOrder(orderRes.data, data);
        resolve(true);
      }, (error) => {
        this.is_order_loading = false;
        reject(true);
      });
    });
  }

  sendOrder(order: IOrder, data?: any) {
    const payload: any = {
      order_id: order.order_id,
      token: data.token,
      token_1: data.token1,
      save_card: data.save_card,
      customer_id: data.customer_id,
      account_no: data.bank_account,
      ifsc_code: data.bank_ifsc,
      bank_code: data.bank_code,
      bank_name: data.bank_name || null,
      auth_mode: data.auth_mode,
      payment_method_change: data.payment_method_change || null,
      flash_checkout: true
    };

    this.util.vars.typ_params = {
      ...this.util.actRoute.snapshot.queryParams,
      id: this.util.checkNestedObj(data, 'cart.campaign_id') || order.campaign_id,
      or: data?.origin,
      oi: order.order_id,
      url: this.util.router.url.split('?')[0],
      currency: order.iso_currency,
      amount: order.donated_amount
    };

    // Do not update tyParams object after this line
    this.util.vars.typ_params = this.util.removeEmptyFromObject(this.util.vars.typ_params);
    this.util.storage.addSessionData('payment_return_params', { k_params: JSON.stringify(this.util.vars.typ_params), ...this.util.vars.typ_params });
    const domain = this.util.vars.domain_details.domain_url + environment.base_ref;
    payload['return_url'] = domain + `payment-route?${this.util.objToUrlString(this.util.vars.typ_params)}`;

    this.api.post(environment.APP.API_URLS.SEND_ORDER, payload).subscribe((res) => {
      const sendOrderRes = res.data;
      this.is_order_loading = false;
      if (sendOrderRes.charged === false) {
        switch (true) {
          case order.payment_gateway === 'razorpay':
            this.script.loadScript('razor_pay').then(() => this.startRazorPayment(order, sendOrderRes));
            break;

          default:
            this.submitToPaymentGateway(res, data, order);
            break;
        }
      }
    }, (error) => {
      this.is_order_loading = false;
    });
  }

  startRazorPayment(order: IOrder, sendOrderRes: any) {
    const options = {
      key: this.payment_options?.setting?.razorpay?.key,
      amount: order.donated_amount * 100,
      currency: order?.iso_currency,
      // name: 'K2',
      name: this.util.vars.product_name,
      description: 'Add Money',
      // image: 'https://ketto.gumlet.io/assets/images/logo-light-bg.svg?w=100&dpr=1.0',
      image: 'https://d1vdjc70h9nzd9.cloudfront.net/media/directupload/3000/3921/image/f062988e48d2c840ac8c3361401b34f05a618719.png',
      order_id: sendOrderRes?.order_id,
      modal: {
        ondismiss: () => this.is_order_loading = false
      },
      handler: (resp: any) => {
        Object.assign(this.util.vars.typ_params, resp);
        this.is_order_loading = false;
        this.util.router.navigate(['/payment-route'], { queryParams: this.util.vars.typ_params });
      },
      prefill: {
        name: this.cart_data.cart.donor_name,
        email: this.cart_data.cart.donor_email,
        contact: this.cart_data.cart.donor_phone,
      },
      theme: {
        color: '#EA7869'
      },
      config: {
        display: {
          hide: [
            // { method: 'card' },
            { method: 'wallet' },
            { method: 'paylater' }
          ],
        }
      }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on('payment.error', (err: any) => {
      this.is_order_loading = false;
      console.log(err);
      this.payment_failed_once.next(true);
      const payload = {
        razorpay_payment_id: err?.error?.metadata?.payment_id || '',
        razorpay_order_id: err?.error?.metadata?.order_id || '',
        source: err?.error?.source || '',
        reason: err?.error?.description || ''
      };
      this.failEvent(order, payload);
      const url = environment.APP.API_URLS.KBANK_PAYMENT_RESPONSE(order.order_id) + '?showError=false';
      this.api.post(url, payload).subscribe({
        next: (res) => {
          this.util.router.navigate(['/payment-route'], { queryParams: this.util.vars.typ_params }).then(() => {
            location.reload();
          });
        },
        error: (err) => {
          this.util.router.navigate(['/payment-route'], { queryParams: this.util.vars.typ_params }).then(() => {
            location.reload();
          });
        }
      });
    });
    setTimeout(() => {
      this.is_order_loading = false;
    }, 2000);
  }

  failEvent(order: IOrder, gate_res: any) {
    this.event.sendClaverTapEvent('K2Bank Add Money Failure', {
      'Amount': order.donated_amount,
      'Cart ID': this.cart_data.cart.id,
      'Failure Reason': gate_res?.reason,
      'ISO Currency': order.iso_currency,
      'Order ID': order.order_id,
      'Payment Mode': gate_res?.source
    }).catch((err) => { console.log(err) });
    // const payload = {
    //   eventName: 'payment_failed',
    //   info_1: order?.order_id,
    //   info_2: gate_res?.razorpay_order_id,
    //   info_3: gate_res?.razorpay_payment_id,
    //   info_4: gate_res?.source
    // };
    // this.event.sendSystemEvent(payload).subscribe(_ => _);
  }

  submitToPaymentGateway(sendOrderRes: any, data: any, order: IOrder) {
    if (sendOrderRes.params) {
      for (const key of Object.keys(sendOrderRes.params)) {
        const value = data[key];
        if (value !== undefined) {
          sendOrderRes.params[key] = value;
        }
      }
    }
    Object.assign(sendOrderRes, { gateway: this.payment_options.gateway, mode: data.mode, order: order });
    this.submitToPaymentGatewayPost(sendOrderRes);
  }

  submitToPaymentGatewayPost(res: any) {
    const gatewayRespnse = res; // assuming that `res` holds the data return by JusPay API
    const url = gatewayRespnse.url;
    const method = gatewayRespnse.method;

    const frm = document.createElement('form');
    frm.setAttribute('method', method);
    frm.setAttribute('action', url);
    frm.setAttribute('id', 'payment_form');
    frm.setAttribute('class', 'juspay_inline_form'); // Class for juspay payment gateway
    if (gatewayRespnse.params) {
      const params = gatewayRespnse.params;
      for (const key of Object.keys(params)) {
        const value = params[key];
        const field = document.createElement('input');
        field.setAttribute('type', 'hidden');
        field.setAttribute('name', key);
        field.setAttribute('class', key);
        field.setAttribute('value', value);
        frm.appendChild(field);
      }
    }
    document.body.appendChild(frm);
    frm.submit();
  }


  eventForInitiatePayment() {
    return new Promise((resolve, reject) => {
      const systemEvent = {
        eventName: 'contribution initiated',
        info_1: this.cart_data.cart.donated_amount,
      };
      this.event.sendSystemEvent(systemEvent).subscribe(_ => _);
      resolve(true);
    });
  }

  eventAfterCreatingCart() {
    return new Promise((resolve, reject) => {
      const systemEventCartCreate = {
        eventName: 'razorpay cart created - event',
        info_1: this.cart_data.cart.donated_amount
      };
      this.event.sendSystemEvent(systemEventCartCreate).subscribe(_ => _);
      resolve(true);
    });
  }

  eventAfterCreatingOrder(order: IOrder, data: any) {
    return new Promise((resolve, reject) => {
      const systemEvent = {
        'eventName': 'order_created',
        'info_1': this.cart_data.cart.donated_amount,
        'info_2': order.id
      };
      this.event.sendSystemEvent(systemEvent).subscribe((next) => resolve(true), (err) => resolve(err));
    });
  }

}
