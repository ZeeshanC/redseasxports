import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from '../../services/util/util.service';

@Injectable({
  providedIn: 'root'
})
export class SacGuard implements CanActivate {

  constructor(
    public router: Router,
    public util: UtilService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(route);
  }

  checkLogin(route: any): boolean {
    const data = this.util.storage.get(`${this.util.vars.user_key}`);
    if (data) {
      switch (true) {
        case data.user?.isLoggedIn:
        case this.util.vars.isFOS:
          return true;
        default:
          this.router.navigate(['crowdfunding/signup'], { queryParamsHandling: 'merge', queryParams: route.queryParams });
          return false;
      }
    } else {
      this.router.navigate(['crowdfunding/signup'], { queryParamsHandling: 'merge', queryParams: route.queryParams });
      return false;
    }
  }

}
