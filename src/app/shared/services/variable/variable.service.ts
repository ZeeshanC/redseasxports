import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { ICLientData } from '../../models/client.model';
import { Currency, EuropeanCountries, GulfCountries } from '../../models/currency-list';
import { ICurrency } from '../../models/currency.model';
import { IHost } from '../../models/host.model';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  campaign_type = '';
  criteo_partner_id: any = {
    'IN': 56509,
    'AE': 69550
  };
  currencies: ICurrency[] = Currency;
  default_ip_location: any = {
    'country_code': 'IN',
    'country_name': 'India',
    'city_name': 'Mumbai',
    'region_name': 'Maharashtra',
    'latitude': 19.0144100189209,
    'longitude': 72.84793853759766,
    'zip_code': '400099'
  };
  device_type: string = '';
  device_height = 0;
  device_width = 0;
  domain_details: IHost | any;
  european_countries = EuropeanCountries;
  event_info = { info_1: '', info_2: '', info_3: '', info_4: '' };
  gulf_countries = GulfCountries;
  is_logged_in = new BehaviorSubject<any>(false);
  lead_mail_to = 'leads.ketto@gmail.com';
  login_method = '';
  login_type: 'p' | 't' | '' = ''; // p=permanent, t=temparory and empty means not loggedin
  non_sys_events_campaigns = ['/zerodha', '/dream11-for-india', '/inthistogether', '/oyocare-dfy'];
  os = '';
  page_name = '';
  product_name = 'infin.care';
  stripe_us_token: any;
  typ_params: any;
  u_auth = '';
  user_data = new BehaviorSubject<IUser | null>(null);
  user_data_key = 'userdata';
  user_key = 'user';
  user_location = new BehaviorSubject<ICLientData | null>(null);
  user_type: 'fresh' | 'repeat' = 'fresh';
  campaign_id: any = '';
  aadharReqId: any;
  adminToken = '';
  loginType = '';
  loginMethod = '';
  isFOS = false;
  selectedHospital: any;
  medical_bill_kbank: any = [];
  basic_info = '';
  ctWebNativeData: any[] = [];

  salaryRangeData = [
    { label: '0-5 lakh', value: '0-5 lakh' },
    { label: '5-10 lakh', value: '5-10 lakh' },
    { label: '10-15 lakh', value: '10-15 lakh' },
    { label: '15-20 lakh', value: '15-20 lakh' },
    { label: '20+ lakh', value: '20+ lakh' },
    { label: 'None', value: 'None' },
  ];
  genderData = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: 'NA' },
  ];

  urls = {
    pusher: 'https://cdnjs.cloudflare.com/ajax/libs/pusher/4.3.1/pusher.min.js',
    lightGallery: 'https://cdn.jsdelivr.net/npm/lightgallery.js@1.1.1/dist/js/lightgallery.min.js'
  }
  verloop_loading = false;

  is_ketto_pay = false;

  useKettoLogin = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.domain_details = {
        domain_name: window.location.hostname,
        full_url: window.location.href,
        domain_url: window.location.origin,
      };
      this.setSize();
    }
  }

  setSize() {
    this.device_width = document.documentElement.clientWidth || 0;
    this.device_height = document.documentElement.clientHeight || 0;
  }

}
