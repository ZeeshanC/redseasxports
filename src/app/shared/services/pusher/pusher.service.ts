import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from '../cookie/cookie.service';
import { ScriptLoaderService } from '../script-loader/script-loader.service';
import { StorageService } from '../storage/storage.service';
import { UtilService } from '../util/util.service';
import { VariableService } from '../variable/variable.service';

declare let Pusher: any;
@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusherChannel: any = null;
  sendOrderId: any;
  channelName: any;
  public openAckPopup = new Subject();
  // userId = this.utilService.fundraiser.id + this.cookieService.getCookie('_ku');

  constructor(
    public cookieService: CookieService,
    public vars: VariableService,
    public utilService: UtilService,
    private scriptLoaderService: ScriptLoaderService,
    private storageService: StorageService
  ) { }

  pusherObj = {
    subscribe: (channelId?: string) => {
      return new Promise((resolve, reject) => {
        // tslint:disable-next-line: variable-name
        const userdata = this.storageService.get('userdata');
        const kbank  =userdata.kbank;
        const _kuChannelId = `${kbank.id}-${this.cookieService.getCookie('_ku')}`;
        const channel = this.sendOrderId = _kuChannelId;
        if (typeof Pusher !== 'undefined') {
          if (!this.pusherChannel) {
            this.createChannel(channel);
          } else if (this.pusherChannel.name !== channel) {
            this.createChannel(channel);
          }
          resolve(this.pusherChannel);
        } else {
          this.scriptLoaderService.loadScript('lightgallery').then(res => {
            resolve(this.pusherObj.subscribe(channelId));
          });
        }
      });
    }
  };

  pusherAadharObj = {
    subscribe: (channelId?: string) => {
      return new Promise((resolve, reject) => {
        const channel = this.vars.aadharReqId.toString();  // Add Request Nonce | only string is accepted as Channel Id
        console.log(channel);
        if (typeof Pusher !== 'undefined') {
          if (!this.pusherChannel) {
            this.createChannel(channel);
          } else if (this.pusherChannel.name !== channel) {
            this.createChannel(channel);
          }
          resolve(this.pusherChannel);
        } else {
          this.scriptLoaderService.loadScript('pusher').then(res => {
            resolve(this.pusherObj.subscribe(channelId));
          });
        }
      });
    }
  };

  /** Create the pusher channel */
  createChannel(channel: string): void {
    const pusher = new Pusher(environment.pusher_key, {
      cluster: 'ap1',
      forceTLS: true
    });
    this.pusherChannel = pusher.subscribe(channel);
  }

    /** Wait for the pusher response then triger */
    // tslint:disable-next-line: typedef
    async pusher(channel: string, type?: any) {
      console.log(channel, type);
      this.channelName = channel;
      if ( type === 'aadhar') {
        const pusherChannel: any = await this.pusherAadharObj.subscribe();
        pusherChannel.bind(channel, (event: any) => {
        });
      }
    }

}
