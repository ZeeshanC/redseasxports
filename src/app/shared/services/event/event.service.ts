import { Injectable } from '@angular/core';
import { UtilService } from '../util/util.service';
import { IUser } from '../../models/user.model';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScriptLoaderService } from '../script-loader/script-loader.service';

declare let clevertap: any;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  is_ct_login = false;

  constructor(
    private http: HttpClient,
    private script: ScriptLoaderService,
    private util: UtilService
  ) {
    // this.is_ct_login = util.storage.get('is_ct_login') ? true : false;
  }

  async onLoadSystemEvent(payload: any) {
    if (this.util.is_browser) {
      this.sendSystemEvent(payload).subscribe(_ => _);
    }
  }

  sendSystemEvent(data: any) {
    if (typeof window !== 'undefined' && this.util.skipSystemEvents()) {
      return throwError(() => '');
    }

    const user: IUser = this.util.storage.get(`${this.util.vars.user_data_key}`);

    const payload: any = {
      ...this.util.utm_url_obj,
      device: this.util.vars.device_type,
      entity_id: user?.id || null,
      page_name: this.util.vars.page_name,
      referrer_page: document.referrer || null,
      ...data
    };
    if (data?.page_name) { payload.page_name = data?.page_name; }

    const url = environment.APP.CORE_API + environment.APP.API_URLS.SYSTEM_EVENT_GTM;
    const options = {
      headers: new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' }),
      params: this.util.removeEmptyFromObject(payload)
    };
    return this.http.get(url, options);
  }

  sendClaverTapEvent(name: string, pushObject: any) {
    return new Promise(async (resolve, reject)=> {
      const user: IUser = this.util.storage.get(`${this.util.vars.user_data_key}`);
      const payload: any = {
        ...this.util.utm_url_obj,
        'Device Type': this.util.vars.device_type,
        'OS': this.util.vars.os,
        'Page Name': this.util.vars.page_name,
        'Page Version': 'Angular',
        'Email ID': user?.email || null,
        'Identity': user?.id || null,
        'User Name': user?.full_name || null,
        'Mobile': user?.phone_1 || null,
        ...pushObject
      }
      try {
        if (typeof clevertap === 'undefined') {
          this.script.loadScript('clevertap', '', true);
          await this.util.isScriptReady('ct_loaded');
          await this.util.waitingTime(100);
        }
        if (!this.is_ct_login && user) {
          const ct_profile = {
            'Site': {
              'Identity': user?.id,
              'Email': user?.email,
              'Name': user?.full_name,
              'Phone': `${user?.extension}${user?.phone_1}`,
              'Full Name For URL': encodeURI(user?.full_name || ''),
              'Login_Via': this.util.vars.login_method
            }
          };
          clevertap.onUserLogin.push(ct_profile);
          this.is_ct_login = true;
          // this.util.storage.add('is_ct_login', true);
        }
        clevertap.event.push(name, this.util.removeEmptyFromObject(payload));
        resolve('');
      } catch (e) {
        console.log(e);
        reject(false);
      }
    })
  }

}
