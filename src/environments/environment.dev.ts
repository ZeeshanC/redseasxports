import { API_URLS } from './api-urls';

export const environment = {
  name: 'staging',
  production: false,
  firebase: {
    apiKey: 'AIzaSyATJLhlswzu0dRFoWfP-Xcp4G_pE_Kzlpk',
    authDomain: 'ketto-login.firebaseapp.com',
    databaseURL: 'https://ketto-login.firebaseio.com',
    projectId: 'ketto-login',
    storageBucket: 'ketto-login.appspot.com',
    messagingSenderId: '154316787884'
  },
  gtm_id: 'GTM-K25VCW5',
  google_optimize: 'OPT-PTB5MWC',
  clevertap_id: 'TEST-796-75K-586Z',
  facebook_id: '287403324698248',
  facebook_pixel: '538031250815425',
  google_client_id: '154316787884-v1hbq46oa8g9vpfnt7m7s9b6i3cul0pc.apps.googleusercontent.com',
  google_client_id_one_tap: '1035507078055-g4qo9db9end019j57f1blo0tfr0m0qtm.apps.googleusercontent.com',
  vwo: '326437',
  bugsnag: 'e9ac81b71cbf1cef3225a069b2fcc3d4',
  sentry: 'ba67c8ca81c84819b7e31ebddd920831',
  sentryAccountId: '1365515',
  tinyMCE: {
    key: 'hdpy7vs33ws3nnga6ziz6buow7j107lx22up391808sw2ntk'
  },
  algolia: {
    key: 'f8545d597bc150f5b32410b350cb2bc0',
    id: 'Q2WBPSP0YD',
    index: 'fundraiser_dev',
    disease: {
      index: 'dev_diseases',
      not_listed: 1820
    },
    hospital: {
      index: 'dev_hospitals',
      not_listed: 804783,
      not_admitted: 804784,
      no_hospitalisation_required: 804785
    }
  },
  meilisearch: {
    host: 'https://meilisearchdev.ketto.org',
    key: 'c2c6a47901b031f1d6fb89e66a227858ea42ddb3053bb746e32a990cdec751f0',
    index: 'fundraiser_dev',
    disease: {
      index: 'dev_diseases',
      not_listed: 1820
    },
    hospital: {
      index: 'dev_hospitals',
      not_listed: 804783,
      not_admitted: 804784,
      no_hospitalisation_required: 804785
    }
  },
  truecaller: {
    partnerKey: 'wWJP67524561d2a794a8fb52141cdc4f70987',
  },
  gcaptcha: '6Lemuy0UAAAAAAJL2gRKu1BzpYtg5oI8QJCT89bI',
  invisible_captcha: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  juspay: 'https://sandbox.juspay.in/',
  pusher_key: '5a179ea8cd27b83badfc',
  base_ref: '/new/',
  static_assets: 'https://static.ketto.org/',
  zoho_mail_medical: 'owk3jot5z_hfj8paj@parser.zohocrm.com',
  zoho_mail: '5jsam3p3a_byld1ab@parser.zohocrm.com',
  manage_domain: 'https://devmanage.ketto.org',
  sipretention_domain: 'https://devsip.ketto.org',
  microsoft_clarity: 'f5d5n1q3au',
  APP: {
    KETTO_BASE_URL: 'https://dev5.ketto.org/',
    BASE_URL: 'https://devapis.ketto.org/api/',
    CORE_API: '',
    IMAGE_DOMAIN: 'https://d1odpswjdg60uv.cloudfront.net',
    GET_IP: 'third_party/iplocation',
    DOMAIN_URL: 'https://dev2.ketto.org',

    API_URLS
  },
  health_first_campaign_id: 812634
};
