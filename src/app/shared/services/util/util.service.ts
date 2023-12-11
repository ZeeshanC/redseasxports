import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { VariableService } from '../variable/variable.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Location, isPlatformBrowser } from '@angular/common';
import { CookieService } from '../cookie/cookie.service';
import { Currency } from '../../models/currency-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  currency = new BehaviorSubject<any>(null);
  is_browser: boolean;
  utm_url_string: string = '';
  utm_url_obj: any;
  is_mobile: boolean = false;
  isToken = false;
  public environment = environment; 
  /** Is Logged In */
  public isLoggedIn = new BehaviorSubject<any>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();
  public draft = new Subject<any>();
  public draft$ = this.draft.asObservable();
  public param = new Subject<any>();
  public param$ = this.param.asObservable();
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public actRoute: ActivatedRoute,
    public cookie: CookieService,
    public location: Location,
    public router: Router,
    private snackBar: MatSnackBar,
    public storage: StorageService,
    public vars: VariableService
  ) {
    this.is_browser = isPlatformBrowser(this.platformId);
    if (this.is_browser) {
      this.is_mobile = this.isMobile();
      this.utm_url_string = this.getUTMonly('url_string');
      this.utm_url_obj = this.getUTMonly();
      this.setOS();
    }
  }

  openSnackBar(message: any, type: any, config?: MatSnackBarConfig) {
    if (typeof window !== 'undefined') {
      const snackBarClass = `snackbar-${type}`;
      const matConfig: MatSnackBarConfig = {
        verticalPosition: config?.verticalPosition || 'top',
        horizontalPosition: config?.horizontalPosition || 'center',
        panelClass: [snackBarClass],
        duration: config?.duration || 10000
      };
      this.snackBar.open(message, 'DISMISS', matConfig).afterOpened().subscribe(() => {
        const el: any = document.getElementsByTagName('snack-bar-container').item(0);
        if (el) {
          el.parentElement.parentElement.style.zIndex = '1001';
        }
      });
    }
  }

  goBack(use_router = false, route?: string, param?: any) {
    if (use_router) {
      this.router.navigate([route], { queryParams: param, queryParamsHandling: 'merge' });
    } else {
      this.location.back();
    }
  }

  getCampaignTypeFromId(id: number) {
    switch (id) {
      case 20:
        return 'personal';
      case 48:
        return 'ngo';
      case 49:
        return 'creative';
      case 149:
        return 'ad';
    }
  }

  checkNestedObj(obj: any, key: any) {
    return key.split('.').reduce((o: any, x: any) => (typeof o === 'undefined' || o === null) ? o : o[x], obj);
  }

  getUrlParams() {
    if (typeof document !== 'undefined') {
      const search = document.location.search.substring(1);
      return search.split('&').reduce(function (prev: any, curr) {
        if (curr) {
          const p = curr.split('=');
          prev[p[0]] = decodeURIComponent(p?.[1]) || '';
        }
        return prev;
      }, {});
    }
  }

  getUTMonly(returnType?: 'url_string' | ''): any {
    const parmas = this.getUTMs();
    const utmParams = Object.keys(parmas).filter(key => key.toString().toLocaleLowerCase().match('utm')).reduce((cur, key) => Object.assign(cur, { [key]: parmas[key] }), {});
    if (returnType === 'url_string') {
      return Object.keys(utmParams).length ? this.getUrlQueryStringFromObject(utmParams) : '';
    } else {
      return utmParams;
    }
  }

  getUTMs() {
    const utmsInUrl = this.getUrlParams();
    const utmsInCookie = this.cookie.getDecodedCookies('k_utm');
    if (utmsInUrl && utmsInUrl.hasOwnProperty('utm_source')) {
      return utmsInUrl;
    } else if (utmsInCookie && utmsInCookie.hasOwnProperty('utm_source')) {
      return utmsInCookie;
    } else {
      return {};
    }
  }

  getUrlQueryStringFromObject(qParamObject: any) {
    if (typeof document !== undefined) {
      return new URLSearchParams(qParamObject).toString();
    }
  }

  skipSystemEvents() {
    let temp = false;
    this.vars.non_sys_events_campaigns.forEach((item: any) => {
      if (typeof window !== 'undefined' && window.location.pathname.includes(item)) {
        temp = true;
      }
    });
    return temp;
  }

  removeEmptyFromObject(obj: any) {
    return Object.entries(obj).reduce((o: any, [key, value]) => (value === '' || value === null || value === undefined || value === 'undefined' ? o : (o[key] = value, o)), {});
  }

  getCurrencyFromCode(code: string) {
    const currency = this.vars.currencies.find((item: any) => item.code === code);
    if (currency) {
      return currency;
    }
    if (this.vars.european_countries.includes(code)) {
      return this.vars.currencies.find(item => item.code === 'EUR');
    } else if (this.vars.gulf_countries.includes(code)) {
      return this.vars.currencies.find(item => item.code === 'SAR');
    } else {
      return this.vars.currencies.find(item => item.code === 'US');
    }
  }

  setCurrency(currency: any) {
    this.currency.next(currency);
    this.storage.addSessionData('currency', currency);
  }

  isMobile() {
    if (this.is_browser) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      }
    }
    return false;
  }

  setArray(array: any, id: string, label: string) {
    const temp: any[] = [];
    for (const item of array) {
      temp.push({
        'value': item[id],
        'label': item[label],
      });
    }
    return temp;
  }

  /**File upload validation */
  onFileChange(event: any) {
    const regEx = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      const fileSize = file.size / 1024 / 1024;
      if (regEx.exec(file.name)) {
        if (fileSize < 10) {
          return { message: 'Success', error: false };
        } else {
          return { message: 'File size exeeds 10MB', error: true };
        }
      } else {
        return { message: 'Unsupported file format', error: true };
      }
    }
  }

  detectBrowser(): String {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      const browser = userAgent.match('Chrome|Firefox|Safari|NetScape|Opera|MSIE');
      return browser ? browser[0] : '';
    } else {
      return '';
    }
  }

  setOS() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) {
      this.vars.os = 'Windows';
    } else if (userAgent.indexOf('Mac') !== -1) {
      this.vars.os = 'MacOS';
    } else if (userAgent.indexOf('Android') !== -1) {
      this.vars.os = 'Android';
    } else if (userAgent.indexOf('iOS') !== -1) {
      this.vars.os = 'iOS';
    } else if (userAgent.indexOf('Linux') !== -1) {
      this.vars.os = 'Linux';
    } else {
      this.vars.os = 'Unknown';
    }
    console.log(userAgent);
    console.log(this.vars.os);
  }

  objToUrlString(data: any, param_key?: string) {
    if (typeof data === 'object') {
      let new_str = '';
      for (const key in data) {
        if (typeof data[key] === 'object') {
          new_str = new_str + (new_str ? '&' : '') + this.objToUrlString(data[key], key);
        } else {
          new_str = new_str + (new_str ? '&' : '') + (param_key || key) + '=' + data[key];
        }
      }
      return new_str;
    }
    return data;
  }

  getCurrencySymbol(c: string) {
    return Currency.find((item) => item.currency === c)?.symbol?.toString();
  }

  isAppleDevice = (): boolean => /iPhone Simulator|iPad Simulator|iPod Simulator|iPad|iPhone|iPod|Mac/.test(navigator.userAgent);

  isScriptReady(name: any) {
    return new Promise((resolve, reject) => {
      if (typeof document !== 'undefined') {
        document.addEventListener(name, () => {
          resolve(true);
        });
      } else {
        reject(false);
      }
    });
  }

  async waitingTime(sec = 10) {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve(true); }, sec); });
  }

  verifyFirebaseOtp(otp: number) {
    return (<any>window).confirmationResult.confirm(otp);
  }

  addCssToGlobal(link:any) {
    if (typeof document !== 'undefined') {
      const _el = document.createElement('link');
      _el.href = link;
      _el.rel = 'stylesheet';
      document.getElementsByTagName('head')[0].appendChild(_el);
    }
  }

  addObject(newOb: any, oldOb: any) {
    for (const key of Object.keys(newOb)) {
      oldOb[key] = newOb[key];
    }
    return oldOb;
  }
  getInitials(str: string) {
    return str?.split(' ')?.slice(0, 2)?.map((ini: string) => ini?.charAt(0)?.toUpperCase())?.join('');
  }

  checkValidForm(form: any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return form.valid;
  }

  nativeNavigation(url: string, in_new_tab?: boolean) {
    if (this.is_browser) {
      if (this.utm_url_string && !url?.match('utm_')) {
        url += (url?.includes('?') ? '&' : '?') + this.utm_url_string;
      }
      if (in_new_tab) {
        window.open(url, '_blank');
      } else {
        document.location.href = url;
      }
    }
  }
}
