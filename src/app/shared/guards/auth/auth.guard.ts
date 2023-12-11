import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UtilService } from '../../services/util/util.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public util: UtilService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(next, state);
  }

  checkLogin(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (next?.queryParams?.bypass) {
      return true;
    }
    const url_no_param = state.url.split('?')[0];

    let redirect_to = '';
    const params: any = {};

    console.log(this.util.vars.useKettoLogin);

    const user = this.util.storage.get(`${this.util.vars.user_data_key}`);

    if(this.util.is_browser && this.util.vars.useKettoLogin && !this.util.cookie.getCookie('u_auth')) {
      const ketto_login = environment.APP.KETTO_BASE_URL + `new/signin?redirect_uri=https://${document.location.host}`;
      this.util.nativeNavigation(ketto_login);
      return false;
    } else if (this.util.vars.useKettoLogin && user && !user?.kbank) {
      this.util.nativeNavigation(environment.APP.KETTO_BASE_URL);
      return false;
    }

    if (!user?.kbank) {
      if (!(/login/).exec(url_no_param)) {
        redirect_to = 'login';
      }
    } else if (user?.kyc?.length === 0 || (user?.kyc?.length >= 1 && user?.kyc[0]?.status !== 1)) {
      if (!(/kyc/).exec(url_no_param)) {
        redirect_to = 'kyc';
        params['kycRetry'] = (user?.kyc?.length >= 1 && user?.kyc[0]?.status === 2) ? 1 : null;
      }
    } else if (!user?.k_bank_order) {
      if (!(/add-money/).exec(url_no_param) && !(/payment-route/).exec(url_no_param)) {
        redirect_to = 'add-money';
      }
    }

    if (redirect_to) {
      this.util.router.navigate([redirect_to], { queryParams: params, queryParamsHandling: 'merge' }).catch((err) => { console.log(err); });
      return false;
    }

    return true;
  }
}