export const API_URLS = {
  // Other
  GET_HEADER(domainName: string) { return `domain/${domainName}`; },
  GET_IP: 'third_party/iplocation',
  // USer and Auth APIs
  LOGIN: 'auth/login',
  LOGOUT: 'users/logout',
  LOGIN_FACEBOOK: 'callback/facebook',
  LOGIN_GOOGLE: 'callback/google',
  LOGIN_GOOGLE_ONETAP: 'callback/googleonetap',
  LOGIN_OTP_VERIFY: 'verify/otp/token',
  USER_DETAILS_VERIFY: 'verify/details',
  LOGIN_OTP: 'auth/login/otpLogin',
  REGISTER: 'users',
  UPLOAD_PROFILE_PIC(userId: number) { return `users/${userId}/media/individual/profile`; },
  GET_USER_PROFILE: 'users/me',
  FORGOT_PASSWORD: 'auth/password/email',
  RESET_PASSWORD: 'auth/password/reset',
  PUSH_NOTIFICATIONS(userId: number) { return `users/${userId}/notifications/setting`; },
  GET_USER_ORDERS: 'users/me/orders',
  GET_USER_SUMMARY: 'users/me/orders/summary',
  AUTO_LOGIN: 'auth/autologin',
  PAYTM_LOGIN: 'callback/paytm',
  CHECK_USER_IS_VALID(emailId: string) { return `check/user/${emailId}`; },
  CHECK_EXISTING_EMAIL: 'admin/verify',

  // Core APIs
  SESSION_CHECK: '/vars/auth.php',
  // SESSION_LOGIN: '/login/login-page.php',
  SESSION_LOGOUT: '/login/login-page.php?submitLogout=true',
  SYSTEM_EVENT_GTM: '/vars/system_event.php',
  CONTACT_CAMPAINGER: (campId: number) => `campaigns/${campId}/messages`,
  CONTRIBUTE_NOW: '/contribute/contribute.php',

  // Campaign
  GET_CAMPIGN_COUNT: 'campaign/count',
  GET_NGOS: 'entities/ngo/list',
  GET_CAUSES: 'causes/',
  GET_CAMPAIGNS: 'campaigns',
  GET_CAMPAIGN(draftId: number) { return `campaigns/${draftId}`; },
  GET_CAMPAIGN_DRAFT_DETAILS(entityId: number, draftId: number) { return `users/${entityId}/drafts/${draftId}`; },
  GET_CAUSE_BY_NGO_ID(ngoid: number) { return `entities/${ngoid}/causes`; },
  GET_MERGED_CAUSES: 'causes/mergedcauses?with=child&id=20,49',
  CREATE_NEW_CAMPAIGN(entityId: number) { return `users/${entityId}/campaigns`; },
  UPDATE_CAMPAIGN(draftId: number) { return `campaigns/${draftId}/drafts`; },
  UPLOAD_LEADERBOARD_IMAGE(draftId: number) { return `campaigns/${draftId}/media`; },
  DELETE_LEADERBOARD_IMAGE(draftId: number, mediaId: string | number) { return `campaigns/${draftId}/media/${mediaId}`; },
  UPLOAD_BENEFICIARY_IMAGE(draftId: number) { return `campaigns/${draftId}/upload/campaign/beneficiary`; },
  UPLOAD_EDITOR_IMAGE(draftId: number) { return `campaigns/${draftId}/upload/campaign/editoimage`; },
  UPLOAD_YOUTUBE_VIDEO(draftId: number) { return `campaigns/${draftId}/media`; },
  ADD_REWARD(draftId: number) { return `campaigns/${draftId}/rewards/`; },
  UPDATE_REWARD(draftId: number, rewardId: number | string) { return `campaigns/${draftId}/rewards/${rewardId}`; },
  GET_REWARD_BY_ID(draftId: number, rewardId: number | string) { return `campaigns/${draftId}/rewards/${rewardId}`; },
  GET_ALL_REWARDS(draftId: number) { return `campaigns/${draftId}/rewards/`; },
  DELETE_REWARD(draftId: number, rewardId: number | string) { return `campaigns/${draftId}/rewards/${rewardId}`; },
  DELETE_MEDIA(id: number, mediaId: number | string): string { return `campaigns/${id}/media/${mediaId}`; },
  PUBLISH_CAMPAIGN(draftId: number) { return `campaigns/${draftId}/publish`; },
  GET_LEAD: 'lead',
  DISEASE_LIST(searchTerm: number | string, searchField: number | string) { return `diseases?search=${searchTerm}&searchFields=${searchField}:like&orderBy=${searchField}`; },
  HOSPITAL_LIST(searchTerm: number | string, searchField: number | string) { return `hospitals?search=${searchTerm}&searchFields=${searchField}:like&orderBy=${searchField}`; },

  // Fundraiser
  GET_FUNDRAISER(customTag: string) { return `fundraisers/${customTag}`; },
  GET_DONORS(customTag: string) { return `fundraisers/${customTag}/donors`; },
  GET_FUNDRAISER_COMMENTS(customTag: string) { return `fundraisers/${customTag}/comments`; },
  GET_FUNDRAISER_SOCIAL_SHARE(campaignId: number) { return `fundraisers/${campaignId}/topshares`; },
  GET_SIMILAR_FUNDRAISER(campaignId: number) { return `campaigns/${campaignId}/similar`; },
  GET_FUNDRAISER_UPDATES(customTag: string) { return `fundraisers/${customTag}/updates`; },
  GET_DONOR_CARD(campaignId: number) { return `fundraisers/${campaignId}/donors`; },
  GET_SHARY_CARD(campaignId: number) { return `fundraisers/${campaignId}/supporter`; },
  POST_COMMENTS_CAMPAIGN(campaignId: number) { return `fundraisers/${campaignId}/comments`; },
  POST_UPDATE_LIKE(campaignId: number, updateId: number) { return `campaigns/${campaignId}/updates/${updateId}/like`; },
  POST_COMMENTS_UPDATE(campaignId: number, updateId: number) { return `fundraisers/${campaignId}/updates/${updateId}/comments`; },
  ASK_FOR_UPDATE(campaignId: number) { return `fundraisers/${campaignId}/askupdate`; },
  UPDATE_ANONYMOUS(entityId: number, orderId: string | number) { return `users/${entityId}/orders/${orderId}`; },
  GENERATE_UPI_LINKS: '/contribute/contribute_api.php',
  GENERATE_UPI_LINKS_RAZOR(campaignId: number) { return `campaigns/${campaignId}/qr`; },
  SUBMIT_ACKNOWLEDGE_FROM: 'payment',
  GET_EVENT(eventId: number | string) { return `events/${eventId}`; },
  GET_EVENT_CAUSES(eventId: number | string) { return `events/${eventId}/causes`; },
  GET_SUBSCRIPTIONS: 'subscriptions/count',
  CAMPAIGN_VISIT(campaignId: number, entityId: number) { return `campaigns/${campaignId}/entity/${entityId}/like`; },

  // Supporting Fundraiser
  GET_SUPPORTING_FRUNDRAISERS(campaignId: number) { return `fundraisers/${campaignId}/supporting_fundraisers`; },
  START_SUPPORTING_FRUNDRAISERS(campaignId: number) { return `fundraisers/${campaignId}/supporting_fundraisers`; },
  EDIT_SUPPORTING_FRUNDRAISERS(campaignId: number, supportingFrId: number | string) { return `fundraisers/${campaignId}/supporting_fundraisers/${supportingFrId}`; },
  CHECK_IF_SUPPORT_FR_CREATED(campaignId: number) { return `fundraisers/${campaignId}/supporting_fundraisers`; },

  // Home
  GET_BANNER() { return `banners/banner?with=mobile;desktop`; },
  GET_TRENDING_FR(currency: string, _ku?: string, qparams?: string) { return `campaigns?tags=trending&currency=${currency.toLowerCase()}&_ku=${_ku}${qparams}`; },
  GET_URGENT_FR() { return `banners/widgets?with=mobile;desktop&limit=1`; },
  GET_SUCCESS_STORIES() { return `banners/stories?with=mobile;desktop`; },
  GET_DRAFT_FR() { return `users/drafts?with=media&under_review=true`; },
  DISCARD_DRAFT() { return `users/drafts/discard`; },
  POST_LEAD_DATA() { return `lead`; },
  GET_TRENDING_STORY() { return `banner/story`; },

  // Set currency
  SET_CURRENCY(cur: string): string { return `/vars/currency.php?cur=${cur.toUpperCase()}`; },

  // Browse
  WIDGET_DATA() { return `campaigns?id=`; },


  // Payment
  GET_PAYMENT_OPTIONS: `payment/options`,
  SEND_ORDER: `payment/send`,
  POST_AMOUNT_DETAILS(campaignId: number) { return `fundraisers/${campaignId}/cart`; },
  PLACE_ORDER(campaignId: number) { return `fundraisers/${campaignId}/order`; },
  GATEWAY_RESPONSE(orderId: string | number) { return `payment/response/${orderId}`; },
  KBANK_PAYMENT_RESPONSE(oi: string | number) { return `kbank/payment/response/${oi}`; },
  CONTRIBUTE_DETAILS_PAYMENT_FORM(campaignId: number) { return `fundraisers/${campaignId}/contribute`; },
  GET_ORDER_DETIALS(campaignId: number, orderId: string | number) { return `fundraisers/${campaignId}/donors/${orderId}`; },
  POST_SMOOCH_START(entityId: number) { return `messaging/user/${entityId}`; },
  POST_SMOOCH_SET_CHANNEL(entityId: number) { return `messaging/user/${entityId}/channel`; },
  POST_SMOOCH_SUCCESS: `messaging/event`,
  VPA_VALIDATION: `verify/vpa`,
  VPA_TXN_STATUS: `verify/vpatxn`,
  GET_RECURRING_CONTRIBUTE_DETAILS: 'subscribe/contribute',
  GET_LATEST_SUBS: 'subscriptions/latest',
  SIMPL_ELIGIBILITY_CHECK: 'payment/eligibility',
  WITHDRAW_AMOUNT(campaignId: number) { return `campaigns/${campaignId}/kbank/payouts/withdraw` ;},

  // Insurance
  ADD_INSURANCE: 'insurance/create',
  GET_INSURANCE_PREMIUM: 'insurance/premium',
  PAYMENT_INSURANCE: 'insurance/pay',
  UPDATE_PAYMENT_INSURANCE: 'insurance/update',
  GET_INSURANCE_INFO(id: number) { return `insurance/${id}`; },

  // Portfolio Tickr
  PORTFOLIO_TICKR: 'show/tickr',

  // Donors for Tickr
  GET_TICKR_DATA(data: any) {
    return `fundraisers/${data?.campaignId}/donors?with=donoravtar&currency=${data?.currency}&orderBy=id&sortedBy=Desc&conversion=1&limit=${data?.limit}&country_code=${data?.country_code || ''}`;
  },

  // Success Stories Listing
  SUCCESS_STORIES: 'fundraisers/success-story',

  // User Subscription
  GET_USER_SUBSCRIPTION(entityId: number) { return `users/${entityId}/subscriptions/thankyou`; },
  INCREASE_PLEDGE(id: number) { return `subscriptions/${id}`; },
  AMOUNT_REDEEM: 'mbm/redeem',
  UPLOAD_MEDIA(id: number): string { return `campaigns/${id}/media`; },
  GET_HOSP_DISEASE_CITY(type: number | string): string { return `medical/types/${type}/treatment`; },
  GET_COST_HOSP_DISEASE_CITY(type: number | string): string { return `medical/types/${type}/treatment/cost`; },

  //Dashboard
  GET_DASHBOARD(entityId: number) { return `entity/${entityId}/kbank/dashboard?limit=7` },

  // COUPONS
  GET_COUPON_URL(campaignId: number): string { return `campaigns/${campaignId}/sip/coupons`; },
  GET_COA(orderId: string | number): string { return `orders/${orderId}/certificate`; },
  ACTIVATE_REWARD(entity_id: number): string { return `entity/${entity_id}/infos`; },
  VERIFY_PRIVATE_FUNDRAISER_PIN(campId: number): string { return `campaigns/${campId}/verify/pin`; },

  GET_SHORT_URL(): string { return `generate/short-url`; },

  IMPACT_PAGE_LEAD(entity_id: number) { return `entity/${entity_id}/impactpagelead`; },
  NEOKRED_API: (entityId: number) => `entity/${entityId}/credit/details`,
  GET_AADHAAR: (entityTypeID: string): string => `entity/${entityTypeID}/verifications/aadhar`,
  KYC_UPLOAD: (id: string): string => `users/${id}/info`,
  AADHAAR_NAME_VERIFY: (entityId: string) => `entity/${entityId}/kyc/name/match`,

  // kbank
  GET_CAMPAIGN_DRAFT_DETAILS_KBANK: (entityId: any, draftId: any): string => `users/${entityId}/kbank/drafts/${draftId}`,
  UPLOAD_LEADERBOARD_IMAGE_KBANK: (draftId: string) => `campaigns/${draftId}/kbank/media/`,
  DELETE_LEADERBOARD_IMAGE_KBANK: (draftId: string, mediaId: any) => `kbank/entity/${draftId}/campaign/media/${mediaId}`,
  UPLOAD_YOUTUBE_VIDEO_KBANK: (draftId: string) => `campaigns/${draftId}/kbank/media`,
  UPDATE_CAMPAIGN_KBANK: (draftId: any) => `campaigns/${draftId}/kbank/drafts`,
  HOSPITAL_KBANK_PATCH: (campId: any) => `kbank/hospitals/campaigns/${campId}`,
  PUBLISH_CAMPAIGN_KBANK: (draftId: any) => `campaigns/${draftId}/kbank/publish`,
  UPLOAD_MEDIA_KBANK: (id: any) => `campaigns/${id}/kbank/media`,
  CHANGE_CAMPAIGN_STATUS_KBANK: (entityId: any, campId: any) => `entity/${entityId}/campaigns/${campId}/kbank/eligible`
};

