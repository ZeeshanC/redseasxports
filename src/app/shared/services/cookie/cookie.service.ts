import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  getDecodedCookies(name: string) {
    if (typeof document !== 'undefined') {
      const value = '; ' + document.cookie;
      const parts: any = value.split('; ' + name + '=');
      if (parts.length === 2) {
        return JSON.parse(atob(decodeURIComponent(parts.pop().split(';').shift())));
      }
    }
  }

  getCookie(name: string) {
    if (typeof document !== 'undefined') {
      const value = '; ' + document.cookie;
      const parts: any = value.split('; ' + name + '=');
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    }
  }

  setCookie(cname: string, cvalue: string, exdays: number, domain?: string): void {
    if (typeof document !== 'undefined') {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + d.toUTCString();
      if (domain) {
        document.cookie = cname + '=' + cvalue + ';path=/;' + expires + ';domain=' + domain;
      } else {
        document.cookie = cname + '=' + cvalue + ';path=/' + expires;
      }
    }
  }

  deleteCookie(name: string, domain?: string): void {
    if (typeof document !== 'undefined') {
      document.cookie = name + `=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/; domain=${domain || ''}`;
    }
  }
}
