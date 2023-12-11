import { Injectable } from '@angular/core';
import { IHost } from '../../models/host.model';
import { BehaviorSubject } from 'rxjs';
import { ICLientData } from '../../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  device_type: string = '';
  device_height = 0;
  device_width = 0;
  domain_details: IHost | any;
  event_info = { info_1: '', info_2: '', info_3: '', info_4: '' };
  page_name = '';
  product_name = 'redseaexports';
  user_location = new BehaviorSubject<ICLientData | null>(null);
  stripe_us_token: any;
  typ_params: any;
  os: any;

  urls = {
    pusher: 'https://cdnjs.cloudflare.com/ajax/libs/pusher/4.3.1/pusher.min.js',
    lightGallery: 'https://cdn.jsdelivr.net/npm/lightgallery.js@1.1.1/dist/js/lightgallery.min.js'
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.domain_details = {
        domain_name: window.location.hostname,
        full_url: window.location.href,
        domain_url: window.location.origin,
      };
      this.setSize();
    }
  }

  setSize() {
    this.device_width = document.documentElement.clientWidth || 0;
    this.device_height = document.documentElement.clientHeight || 0;
  }

}
