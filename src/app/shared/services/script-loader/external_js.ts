import { environment } from "src/environments/environment";

/**Clever Tap loading script */
export const clevertap_script = `
  var clevertap = {event:[], profile:[], account:[], onUserLogin:[], notifications:[], privacy:[], region: 'in1'};
  clevertap.account.push({"id": '${environment.clevertap_id}'});
  clevertap.privacy.push({optOut: false}); //set the flag to true, if the user of the device opts out of sharing their data
  clevertap.privacy.push({useIP: false}); //set the flag to true, if the user agrees to share their IP data
  (function () {
    var wzrk = document.createElement('script');
    wzrk.type = 'text/javascript';
    wzrk.async = true;
    wzrk.defered = true;
    wzrk.setAttribute('rel', 'preconnect');
    wzrk.src = ('https:' == document.location.protocol ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/clevertap.min.js';
    var s = document.getElementsByTagName('script')[0];
    s.addEventListener('load', function() {
      var _ct = new CustomEvent('ct_loaded', { bubbles: true });
      document.dispatchEvent(_ct);
    });
    s.parentNode.insertBefore(wzrk, s);
  })();
`;


export const verloop_script = `
  (function(w, d, s, u) {
    w.Verloop = function(c) { w.Verloop._.push(c) }; w.Verloop._ = []; w.Verloop.url = u;
    var h = d.getElementsByTagName(s)[0], j = d.createElement(s); j.async = true;
    j.src = 'https://ketto.verloop.io/livechat/script.min.js';
    h.parentNode.insertBefore(j, h);
    j.addEventListener('load', function() {
      var _ct = new CustomEvent('verloop_loaded', { bubbles: true });
      document.dispatchEvent(_ct);
    });
  })(window, document, 'script', 'https://ketto.verloop.io/livechat');
`;