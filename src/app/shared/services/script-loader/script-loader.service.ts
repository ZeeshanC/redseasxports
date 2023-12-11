import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { clevertap_script, verloop_script } from './external_js';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  scripts: any = {
    'clevertap': {
      src: clevertap_script,
      loaded: false,
    },
    'intl_tel_input': {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/14.0.7/js/intlTelInput.min.js',
      loaded: false
    },
    'intl_tel_input_util': {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/14.0.7/js/utils.js',
      loaded: false
    },
    'jquery': {
      src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
      loaded: false
    },
    'pusher': {
      src: `https://cdnjs.cloudflare.com/ajax/libs/pusher/4.3.1/pusher.min.js`,
      loaded: false
    },
    'razor_pay': {
      src: 'https://checkout.razorpay.com/v1/checkout.js',
      loaded: false
    },
    'razor_pay_card': {
      src: 'https://checkout.razorpay.com/v1/razorpay.js',
      loaded: false
    },
    'google_login': {
      src: 'https://accounts.google.com/gsi/client',
      loaded: false
    },
    'verloop': {
      src: verloop_script,
      loaded: false,
    },
    'lightgallery': {
      src: 'https://cdn.jsdelivr.net/npm/lightgallery.js@1.1.1/dist/js/lightgallery.min.js',
      loaded: false
    },
    'googlemaps': {
      src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDCF-b1N89za5IiNd95L27vx-XyFzUeoCE&callback&libraries=places',
      loaded: false
    }
  };

  constructor(
    @Inject(DOCUMENT) private document: any
  ) { }

  loadScript(name: string, params?: any, full_script?: true) {
    return new Promise((resolve, reject) => {
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {
        // load script
        const script: any = this.document.createElement('script');
        script.type = 'text/javascript';
        script.setAttribute('rel', 'preconnect');
        if (full_script) {
          script.innerHTML = this.scripts[name].src;
        } else {
          script.src = this.scripts[name].src;
        }
        script.defer = true;
        if (params) {
          for (const key in params) {
            if (params.hasOwnProperty(key)) {
              script.setAttribute(key, params[key]);
            }
          }
        }
        if (script.readyState) {  // IE
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {  // Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        this.document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }
}
