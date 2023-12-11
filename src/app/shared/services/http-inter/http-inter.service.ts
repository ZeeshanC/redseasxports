import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterService implements HttpInterceptor {

  constructor(
    public injector: Injector
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const services = {
      util: this.injector.get(UtilService)
    };

    const token = services.util.storage.getToken();

    let modifiedRequest: HttpRequest<any>;
    if (token && !req.params.get('filter')) {
      modifiedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    } else {
      modifiedRequest = req.clone({});
    }

    return this.nextHandler(modifiedRequest, next, services);
  }

  nextHandler(req: HttpRequest<any>, next: HttpHandler, services: any): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        const param = req.params.get('showError') || (req?.url?.match('showError=false') ? 'false' : '');
        if (error?.error?.message && param !== 'false' && error?.error?.error !== 'token_expired') {
          services.util.openSnackBar(error.error.message, 'error');
        }
        if (error?.error?.error === 'token_expired') {
          services.util.storage.delete(`${services.util.vars.user_key}`);
          services.util.storage.delete(`${services.util.vars.user_data_key}`);
          services.util.vars.login_type = '';
        }
        return throwError(error);
      }),
      shareReplay()
    );
  }
}
