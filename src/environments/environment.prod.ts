import { API_URLS } from './api-urls';
export const environment = {
  name: 'prod',
  production: true,
  firebase: {
    apiKey: 'AIzaSyATJLhlswzu0dRFoWfP-Xcp4G_pE_Kzlpk',
    authDomain: 'ketto-login.firebaseapp.com',
    databaseURL: 'https://ketto-login.firebaseio.com',
    projectId: 'ketto-login',
    storageBucket: 'ketto-login.appspot.com',
    messagingSenderId: '154316787884'
  },
  gtm_id: 'GTM-MJRMLZ',
  google_optimize: 'GTM-53TTKBR',
  clevertap_id: '696-75K-586Z',
  facebook_id: '287403324698248',
  facebook_pixel: '441308802710601',
  google_client_id: '154316787884-v1hbq46oa8g9vpfnt7m7s9b6i3cul0pc.apps.googleusercontent.com',
  google_client_id_one_tap: '154316787884-v1hbq46oa8g9vpfnt7m7s9b6i3cul0pc.apps.googleusercontent.com',
  bugsnag: '0d02ac2f63382263e24f75c0adad288e',
  sentry: '75803838c87241a19b63dfc73cc4be63',
  sentryAccountId: '1509014',
  tinyMCE: {
    key: 'hdpy7vs33ws3nnga6ziz6buow7j107lx22up391808sw2ntk'
  },
  algolia: {
    key: 'b2caa1b0589e8db9398d5fe2a40bbaed',
    id: 'NN2UORRIZX',
    index: 'fundraiser_prod',
    disease: {
      index: 'prod_diseases',
      not_listed: 4562
    },
    hospital: {
      index: 'prod_hospitals',
      not_listed: 1734593,
      not_admitted: 1734594,
      no_hospitalisation_required: 1734595

    }
  },
  meilisearch: {
    host: 'https://msearch.ketto.org',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWFyY2hSdWxlcyI6eyJwcm9kX2Rpc2Vhc2VzIjp7fSwicHJvZF9ob3NwaXRhbHMiOnt9LCJmdW5kcmFpc2VyX3Byb2QiOnsiZmlsdGVyIjoicGFyZW50X2NhdXNlX2lkICE9IDE0OSJ9fSwiYXBpS2V5VWlkIjoiMjk0YjYzMTAtZjdiNC00MDdiLTg2MWYtMGQ0MTJmMzdkZjc4IiwiaWF0IjoxNjc2ODg3NzkzfQ.CXJdTbdG2JMQPQYnCuXsrv0oFlOjDs8hO3w0Rep4lUE',
    index: 'fundraiser_prod',
    disease: {
      index: 'prod_diseases',
      not_listed: 4562
    },
    hospital: {
      index: 'prod_hospitals',
      not_listed: 1734593,
      not_admitted: 1734594,
      no_hospitalisation_required: 1734595
    }
  },
  truecaller: {
    partnerKey: 'IYGXye7642585d0924b7086aff71119217401',
  },
  vwo: '326437',
  gcaptcha: '6Lemuy0UAAAAAAJL2gRKu1BzpYtg5oI8QJCT89bI',
  invisible_captcha: '6LcYhV8UAAAAABM9Km9bMITOAJyPEJNPM3uYnuQL',
  juspay: 'https://api.juspay.in/',
  pusher_key: 'e8bdd5e81bddad457212',
  base_ref: '/new/',
  static_assets: 'https://devstatic.ketto.org/',
  zoho_mail_medical: 'owk3jot5z_hfj8paj@parser.zohocrm.com',
  zoho_mail: '5jsam3p3a_byld1ab@parser.zohocrm.com',
  manage_domain: 'https://manage.ketto.org',
  sipretention_domain: 'https://sip.ketto.org',
  microsoft_clarity: 'f9y7bhc3fx',
  APP: {
    KETTO_BASE_URL: 'https://www.ketto.org/',
    BASE_URL: 'https://k2.ketto.org/api/',
    CORE_API: '',
    IMAGE_DOMAIN: 'https://kettocdn.gumlet.com',
    GET_IP: 'third_party/iplocation',
    DOMAIN_URL: 'https://k2.ketto.org',

    API_URLS
  },
  health_first_campaign_id: 787165
};
