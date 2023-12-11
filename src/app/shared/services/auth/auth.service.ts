import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private util: UtilService,
  ) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  loginOTPVerify(data: any): any {
    const url = this.api.base_api_url + environment.APP.API_URLS.LOGIN_OTP_VERIFY;
    return this.http.post(url, JSON.stringify(data), this.api.getheaders()).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  userLogin(data: any): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const loginRes = {
          token: data.token,
          user: data.user
        };

        loginRes.user.isLoggedIn = data.login;

        // Set token in storage for later use
        this.util.storage.check(`${this.util.vars.user_key}`, loginRes);
        // Get User profile
        await this.getUpdatedUserData();
        resolve(data.user);
      } catch (error) {
        reject(false);
      }
    });
  }

  register(data: any, hideError?: string, otpStep1?: any) {
    this.util.isToken = false;
    const url = this.api.base_api_url + environment.APP.API_URLS.REGISTER;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { showError: 'true' }
    };
    const httpOptions = hideError ? options : this.httpOptions;
    const params = {
      signup_with_otp: true
    }
    const newHttpOptions: any = {
      ...httpOptions,
    }
    if (otpStep1) {
      newHttpOptions['params'] = params;
    }
    return this.http.post(url, JSON.stringify(data), newHttpOptions).pipe(
      map(res => {
        this.util.isToken = true;
        return res;
      })
    );
  }

  loginViaUAuth(U_AUTH: any) {
    this.util.storage.add(`${this.util.vars.user_key}`, { token: U_AUTH });
    return this.getUserProfile();
  }

  getUserProfile() {
    const url = environment.APP.API_URLS.GET_USER_PROFILE + '?with=avtar;isHospital;listsubscriptions;aggdonationall;activateReward;allActiveCampaigns;lastorder;panNumber;subscriptions;activeSubscription.subscriptionLog;kbank.kBankCampaignType;kbank.activeHospital.entity;kbank.vaccount;kyc;kBankOrder;kbank.banktransfer;qualification;salary;occupation;familyMembers;creditScoreDetails';
    return this.api.get(url);
  }

  async getUpdatedUserData(data?: any) {
    return new Promise((resolve, reject) => {
      this.getUserProfile().subscribe({
        next: (res) => {
          const pre_user_data = this.util.storage.get(`${this.util.vars.user_data_key}`);
          let user: any = res.data;
          if (user?.kbank?.k_bank_campaign_type?.info_1 === 'ketto_pay') {
            this.util.vars.is_ketto_pay = true;
          }
          if (user.lastorder) {
            user = this.setLastOrderInfo(user);
          }
          if (this.util.actRoute.snapshot.queryParams?.set_first) {
            user.k_bank_order = '';
          }
          this.util.storage.check(`${this.util.vars.user_data_key}`, user);
          if (data) {
            this.util.vars.is_logged_in.next(data?.login);
          }
          this.util.vars.user_data.next(user);
          if (!pre_user_data && this.util.vars.u_auth && user?.kbank) {
            this.util.router.navigate(['dashboard'], { queryParamsHandling: 'merge' });
          }
          resolve(user);
        },
        error: (err) => {
          reject(false);
        }
      });
    });
  }

  setLastOrderInfo(user: any) {
    const order = user.lastorder;
    if (order) {
      let info = {
        mode_value: order.payment_mode_value,
        mode: order.payment_mode,
        gateway: order.payment_gateway,
        ...order
      };
      if (order.payment_mode && order.payment_mode.match('UPI')) {
        info.upi_id = order.checksum;
      }
      if (order.checksum && order.payment_gateway && order.payment_gateway.match('stripe')) {
        const stripeChecksum = JSON.parse(order.checksum);
        if (stripeChecksum) {
          this.util.vars.stripe_us_token = stripeChecksum.token_1;
          info = Object.assign(info, stripeChecksum);
        }
      }
      user.lastorder = info;
      return user;
    } else {
      return user;
    }
  }

  userLogout() {
    this.util.storage.clear();
    this.util.cookie.deleteCookie('u_auth');
    if (this.util.vars.useKettoLogin) {
      const ketto_logout = environment.APP.KETTO_BASE_URL + `new/logout`;
      this.util.nativeNavigation(ketto_logout);
    } else {
      this.util.router.navigate(['login'], { queryParamsHandling: 'merge' });
    }
  }
}
