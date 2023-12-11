import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "../api/api.service";
import { AuthService } from "../auth/auth.service";
import { EventService } from "../event/event.service";
import { UtilService } from "../util/util.service";

declare const clevertap: any;

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    constructor(
        private auth: AuthService,
        private util: UtilService,
        private snackBar: MatSnackBar,
        private router: Router,
        private api: ApiService,
        private eventService: EventService
    ) {}

    public isKbankUser = false;
    public user_type = '';
    public startFrType = ''; // medical/ngo/others
    public response: any;
    public isLeadGenerated: boolean = false;
    public otp: any;
    userData: any;


    createSignupPayload(formValues: any) {
        const payload = {
          'email_id': formValues.email,
          'password': formValues.password,
          'user_type': 'individual',
          'registration_source': formValues?.registration_source || 'direct',
          'full_name': formValues.name,
          'phone_1': formValues.mobile.replace(/\s/g, ''),
          'extension': formValues.extn,
          'is_subscribed': '1',
          'invisible_recaptcha': true,
          'accessToken': formValues.accessToken
        };
        return payload;
      }
    
    signupFOS(data: any) {
        return new Promise((resolve, reject) => {
            try {
                const formValues = data.formValues;
                this.startFrType = formValues.startFrType ? formValues.startFrType : 'medical';
                const payload = this.createSignupPayload(formValues);
                this.auth.register(payload).pipe(take(1)).subscribe({
                    next: async (res: any) => {
                        this.util.vars.loginType = 'signup';
                        this.util.vars.loginMethod = 'form';
                        this.response = res;
                        if (!this.response.error) {
                            this.util.storage.addSessionData('sac-purpose-selected', { 'purpose': this.startFrType });
                            this.afterLoginFOS(res);
                            resolve(true);
                        }
                    },
                    error: (err: any) => {
                        if (typeof window !== 'undefined' && err.error && err.error.message === 'The email id has already been taken.') {
                            const signUpPage = ['crowdfunding/signup'];
                            const isSignUpPage = signUpPage.some(page => window.location.pathname.includes(page));
                            if (isSignUpPage) {
                                const matConfig: MatSnackBarConfig = {
                                    verticalPosition: 'top',
                                    horizontalPosition: 'center',
                                    panelClass: ['snackbar-success'],
                                    duration: 10000
                                };
                                this.snackBar.open('Your are already registered with us, Please login', 'LOGIN', matConfig).onAction().subscribe(() => {
                                    document.querySelector('body')!.classList.remove('bg-grey');
                                    this.util.storage.checkFromSession('signup-email', payload.email_id);
                                    this.router.navigate(['/login'], { queryParams: { 'redirect_uri': this.router.url } });
                                });
                            }
                        } else {
                            this.util.openSnackBar(err.error.message, 'error');
                        }
                        reject(err);
                    }
                }); 
            } catch (error) {
                reject(false);
            }
        });
    }

    signup(data: any,otpStep1?: any) {
        return new Promise((resolve, reject) => {
          try {
            const formValues = data.formValues;
            this.startFrType = formValues.startFrType ? formValues.startFrType : 'medical';
            const payload: any = this.createSignupPayload(formValues);
            const response = (<HTMLInputElement>document.getElementById('g-recaptcha-response'))?.value;
            payload['g-recaptcha-response'] = response;

              this.auth.register(payload, 'hideError', otpStep1).pipe(take(1)).subscribe({
                next: async (res: any) => {
                  this.util.vars.loginType = 'signup';
                  this.util.vars.loginMethod = 'form';
                  this.response = res;
                  if (!this.response.error) {
                    resolve('');
                  }
                },
                error: (err) => {
                  if (typeof window !== 'undefined' && err.error && err.error.message === 'The email id has already been taken.') {
                    const matConfig: MatSnackBarConfig = {
                        verticalPosition: 'top',
                        horizontalPosition: 'center',
                        panelClass: ['snackbar-success'],
                        duration: 10000
                    };
                    this.snackBar.open('You are already registered with us, Please login', 'LOGIN', matConfig).onAction().subscribe(() => {
                        document.querySelector('body')?.classList.remove('bg-grey');
                        this.auth.userLogout();
                        this.router.navigate(['/login']);
                    });
                  } else {
                    this.util.openSnackBar(err.error.message, 'error');
                  }
                  reject(err);
                }
            });
          } catch (error) {
            reject(false);
          }
        });
      }

    async afterLoginFOS(response: any) {
        this.response = response;
        this.util.storage.check(`${this.util.vars.user_key}`, response.data);
        this.user_type = response.data.type;
        await this.fosPushData();
        await this.auth.userLogin({ user: response.data, token: response.data.token, login: true });
        if (this.util.vars.isFOS) {
            response.data.newUserToken = response.data.token;
            response.data.token = this.util.vars.adminToken;
            this.util.storage.check(`${this.util.vars.user_key}`, response.data);
        }
        setTimeout(() => {
            const userdata = this.util.storage.get(`${this.util.vars.user_data_key}`);
            this.callNeokredApi(userdata).then(res => {
                console.log('neokred called');
            });
            this.util.router.navigate(['/crowdfunding/medical/basic']);
        }, 1000);
        // this.sessionLogin(this.response.data);
    }

    async pushDataSignup(res: any) {
        const data = res.data;
        const browser = this.util.detectBrowser();
        // CleaverTap signup event
        const claverTapData = {
          'mode': 'Native' || 'Otp',
          'Device Type': this.util.is_mobile ? 'Mobile' : 'Desktop',
          'Page URL': window?.location?.href || '',
          'Session ID': data.token,
          'IP Address': '',
          'Browser': browser,
          'Email': data.user.email_id,
          'User Type': 'individual',
          'Signup Via': this.util.vars.loginMethod
        };
        this.eventService.sendClaverTapEvent('SignUp', claverTapData);
        await this.trackSystemEvent();
    }

    callNeokredApi(user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                // if user has phone number && if user doesnt have address or pan number
                if (user?.phone_1 && (!user?.address_1 || !user?.pan_number)) {
                    const params = { otp: this.otp, is_bank_user: true };
                    this.api.post(environment.APP.API_URLS.NEOKRED_API(user?.id), params, '', false, 'false')
                    .subscribe({next : val => {
                        resolve('');
                    }, error: error => {
                        resolve('');
                    }});
                } else {
                    resolve('');
                }
            } catch (error) {
                reject(false);
            }
        });
    }

    verifyEmail(payload: any) {
        const httpOptions: object = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
        return this.api.post(environment.APP.API_URLS.CHECK_EXISTING_EMAIL, payload, '', httpOptions);
      }

    getUserData() {
        return new Promise(async (resolve) => {
            try {
                if (this.util.vars.loginType === 'signup') {
                    await this.pushDataSignup(this.response);
                } else {
                    await this.pushDataLogin(this.response.data.user.entity);
                }
                this.auth.getUserProfile().subscribe(async (res: any) => {
                    const user = this.auth.setLastOrderInfo(res.data);
                    this.util.storage.check(`${this.util.vars.user_data_key}`, user);
                    this.util.vars.user_data.next(user);
                    this.userData = user;
                    resolve('');
                });
            } catch (error) {
            }
        });
    }

  async fosPushData() {
    return new Promise(async (resolve, reject) => {
      if (this.util.vars.loginType === 'signup') {
        await this.pushDataSignup(this.response);
      } else {
        await this.pushDataLogin(this.response.data.user.entity);
      }
      resolve(true);
    });
  }

   async pushDataLogin(user: any) {
        const data: any = {
            Site: {
                Identity: user.id,
                Name: user.full_name,
                Email: user.email,
                Phone: user.phone_1 ? ('+91' + user.phone_1.replace(/\s/g, '')) : '',
                Entity_Type: user.entity_type,
                Login_Via: this.util.vars.loginMethod
            }
            };
        if (user.gender && user.gender !== 'NA') {
            data.Site['Gender'] = user.gender;
        }
        clevertap.onUserLogin.push(data);
        await this.trackSystemEvent();
    }

    trackSystemEvent() {
        return new Promise(async (resolve) => {
            try {
              const systemEvent = {
                eventName: this.util.vars.loginType, // signup / signin
                event_type: this.util.vars.loginType, // start a fundraiser/ signin
                page_name: this.util.vars.page_name || 'home',
                info_1: 'type',
                info_2: this.util.vars.loginMethod || 'form'  // fb/google/form
              };
              await this.eventService.sendSystemEvent(systemEvent).subscribe(
                () => {
                  resolve('');
                },
                () => {
                  resolve('');
                }
              );
            } catch (error) {
            }
          });
    }

}