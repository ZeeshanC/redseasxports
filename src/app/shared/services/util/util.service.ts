import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { VariableService } from '../variable/variable.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { Location, isPlatformBrowser } from '@angular/common';
import { CookieService } from '../cookie/cookie.service';
import { Currency } from '../../models/currency-list';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  is_browser: boolean;
  utm_url_string: string = '';
  utm_url_obj: any;
  is_mobile: boolean = false;
  isToken = false;
  public environment = environment; 
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

  removeEmptyFromObject(obj: any) {
    return Object.entries(obj).reduce((o: any, [key, value]) => (value === '' || value === null || value === undefined || value === 'undefined' ? o : (o[key] = value, o)), {});
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
