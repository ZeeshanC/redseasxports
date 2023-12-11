import { Component, HostListener, OnInit } from '@angular/core';
import { ICLientData } from './shared/models/client.model';
import { UtilService } from './shared/services/util/util.service';
import { ApiService } from './shared/services/api/api.service';
import { environment } from '../environments/environment';
import { filter, map, mergeMap } from 'rxjs';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { ScriptLoaderService } from './shared/services/script-loader/script-loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  params: any;
  removeMainLayoutClass = false;
  constructor(
    private api: ApiService,
    private script: ScriptLoaderService,
    private util: UtilService
  ) { }

  ngOnInit() {
    if (this.util.is_browser) {
      this.params = this.util.getUrlParams();
      console.log(window.location.host);
      if (window.location.host.match('ketto')) {
      }
      this.setDeviceType();
      this.getClientIP();
      this.routeChangeListner();
    }
  }

  @HostListener('window:load', [])
  onWindowLoads() {
    if (this.util.is_browser) {
      this.script.loadScript('clevertap', '', true);
    }
  }

  getClientIP() {
    const ip = this.util.storage.getFromSession('iplocation');
    if (!ip) {
      this.api.get(environment.APP.GET_IP).subscribe({
        next: (res: any) => {
          this.setClientIP(res.data);
        },
        error: (e) => {
          console.log(e)
        }
      });
    } else {
      this.setClientIP(ip);
    }
  }

  setClientIP(ip: ICLientData) {
    this.util.vars.user_location.next(ip);
    this.util.storage.checkFromSession('iplocation', ip);
  }


  setDeviceType() {
    this.util.vars.device_type = this.util.is_mobile ? 'mobile' : 'desktop';
    const platform = this.util.cookie.getCookie('platform');
    if (platform) {
      this.util.vars.device_type = platform;
    }
    if (this.params?.platform) {
      this.util.storage.addSessionData('platform', this.params?.platform);
    }
    const sesPlatform = this.util.storage.getFromSession('platform');
    if (sesPlatform) {
      this.util.vars.device_type = sesPlatform;
    }
  }

  routeChangeListner() {
    this.util.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.util.actRoute),
      map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe((event: any) => {
      this.util.vars.page_name = event?.page_name || '';
    });
  }

}
