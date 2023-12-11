export interface IFundraiser {
  id: number;
  costbreakdown: any[];
  support_campaign: ISupportCampaign;
  title: string;
  start_date: string;
  end_date: string;
  amount_requested: number;
  entity_details_id: number;
  creator_entity_details_id: number;
  cause_id: number;
  sipcause?: ISipCause;
  is_sip_story?: any;
  address_1: string;
  address_2: string;
  address_3: string;
  priority_self: number;
  thankyouvideo: {
    path: string;
  };
  display_type_self: string;
  disable_foreign_donation: boolean;
  status_flag: number;
  creation_date: string;
  parent_cause_id: number;
  parent_entity_details_id: number;
  event_entity_details_id: number;
  corporate_entity_details_id: number;
  custom_tag: string;
  main_custom_tag: string;
  manager_id: number;
  media_beneficiary: IMediaBeneficiary;
  basicinfo: any[];
  custom_thankyou: string;
  banktransfer: {
    entity_details_id: number,
    entity_type: number,
    id: number,
    info_1: string,
    info_3: string,
    info_type: string,
    account_number: string;
    account_name: string;
    account_ifsc: string;
  };
  gallery: [{
    id: number,
    path: string,
    display_type_1: string,
    entity_type: string,
    file_name: string,
    cdn_path: string
  }];
  cause: {
    id: 51,
    info_1: string,
    info_2: string,
    info_3: string,
    info_4: string,
    parent_cause_id: number,
    status_flag: number
  };
  raised: {
    campaign_id: number,
    backers: number,
    raised: number,
    beforeTickr?: number;
    beforeTickrBackers?: number;
    usdraised: number
    increasedby: any;
    lastweektotal: number;
    last24hrtotal: number;
  };
  disease: {
    id: number,
    entity_details_id: number,
    entity_type: string,
    info_1: string,
    info_2: string,
    info_3: string,
    path: string,
    info_type: string,
    creation_time: string,
    updation_time: string
  };
  // medicalbill: [];
  info: [
    {
      id: number,
      entity_details_id: number,
      entity_type: string,
      info_1: string,
      info_type: string
    }
  ];
  campaigner: ICampaigner;
  beneficiary: {
    access_url: string,
    address_1: string,
    address_2: string,
    address_3: string,
    age: string,
    avtar: {
      entity_type: string,
      entity_type_id: number,
      file_name: string,
      media_type: string,
      path: string,
      cdn_path?: string;
    },
    city: string,
    disable_foreign_donation: number,
    email: string,
    entity_type: string,
    fname: string,
    full_name: string,
    gender: string,
    id: number,
    lname: string,
    no_80g: boolean,
    phone_1: string,
    phone_2: string,
    pincode: string,
    status_flag: 1,
    user_details_id: number,
    website_1: string,
    website_2: string,
    tax_benefit: boolean
  };
  viewmedicalbill: [{
    cdn_path: string,
    detail_1: string,
    entity_type_id: number
    file_name: string,
    media_type: string,
    path: string,
  }];
  team: [{
    designation: string,
    entity_id: number,
    id: number,
    role: string,
    status: number,
    type: string,
    type_id: number,
  }];
  activeteam: [{
    designation: string,
    entity_id: number,
    id: number,
    role: string,
    status: number,
    type: string,
    type_id: number,
    member: {
      avtar: string,
      entity_type: string,
      fname: string,
      full_name: string,
      id: number,
      lname: string,
      sociallinks: any[],
      status_flag: number
    }
  }];
  rewards: IReward[];
  settings: {
    nobenedetails: boolean,
    donation_button: boolean,
    nodonorlist: boolean,
    norecenttab: boolean,
    show_qr: boolean,
    hidedaysleft: boolean
  };
  story_title: IStoryTitle;
  story_description: IStoryDescription;
  theater: {
    cdn_path: string
  };
  story_widget: {
    cdn_path: string
  };
  leaderboard: {
    cdn_path: string
  };
  hospital: {
    entity_details_id: number;
    entity_type: string;
    full_name?: string;
    id: number
    info_1: string;
    info_3: string;
    info_type: string;
    phone_1?: string;
  };
  doctoravatar: {
    cdn_path: string;
  };
  doctor: {
    info_1: string;
  };
  hospitallogo: {
    cdn_path: string;
  };
  video_appeal: IVideoAppeal;
  stop_google_index: boolean;
  updates_count: {
    entity_id: number,
    count: number
  };
  shortdescription: {
    info_1: string
  };
  widget: {
    cdn_path: string
  };
  beneficiaryname: {
    info_1: string
  };
  msw_date: {
    info_1: string,
    info_type: string,
    creation_time: string,
    updation_time: string
  };
  msw_name: {
    info_1: string,
    info_type: string,
    creation_time: string,
  };
  action_date: string;
  action_at: string;
  matching_donor: IMatchingDonor;
  tip_model: boolean;
  manager: {
    entity: {
      full_name: string
    }
  };
  non_medical: boolean;
  is_selected: boolean;
  organiser?: IOrganiser;
  valid_coupon?: ICouponInfo;
  patientstatus: IPatienStatus[];
  user_followed: {
    status: number,
    type_id: number
  };
  isFundraiserEnded: boolean;
}

export interface ISipCause {
  entity_details_id: number;
  entity_type: number;
  id: number;
  info_1: string;
  info_2: string;
  info_3: string;
  info_type: string;
}

export interface IPatienStatus {
  entity_details_id: number;
  entity_type: string;
  info_type: string;
  pstatus_1: string;
  pstatus_2: string;
  creation_time: string;
  info_1: string;
}

export interface IMatchingDonor {
  name: string;
  descriptions: string;
  campaign_id: string;
  image: string;
  logo: string;
  multiplier: number;
  max_amount: number;
  per_donation_cap: number;
  start_date: string;
  status: number;
}
export interface ICampaigner {
  avtar: {
    entity_type: string,
    entity_type_id: number,
    file_name: string,
    media_type: string,
    path: string,
    cdn_path: string
  };
  city: string;
  disable_foreign_donation: 0;
  fname: string;
  full_name: string;
  id: number;
  lname: string;
  no_80g: boolean;
  social: {
    system_user_id: number,
    tp_provider: string,
    status: number,
    friends_count: number
  };
  user_details_id: number;
  agg_fundraiser: {
    cnt: number,
    creator_entity_details_id: number
  };
  aggdonation: {
    donations: number,
    donor_entity_details_id: number,
    funds: number
  };
  tax_benefit: boolean;
  story_widget: {
    cdn_path: string
  };
}
export interface IReward {
  active_backers_count: number;
  amount_from: number;
  amount_to: number;
  amount_usd: number;
  backers: number;
  campaign_id: number;
  descp: string;
  display_text: string;
  expected_date: string;
  id: number;
  notes: string;
  status_flag: number;
  status: boolean;
  amount: number;
}
export interface IBasicInfo {
  about?: string;
  beneficiary_name?: string;
  beneficiary_relation?: string;
  contribute?: string;
  disease?: string;
  hospital?: string;
  manager?: string;
  social?: string;
  video_leaderboard?: string;
  translation?: string;
}

export interface IFundraiserMetaData {
  description?: string;
  keywords?: string;
  campaigner?: string;
  beneficiary?: string;
  title?: string;
  image?: string;
  url?: string;
  site?: string;
}

export interface IStoryDescription {
  entity_details_id: number;
  entity_type: string;
  id: number;
  info_1: string;
  info_3: string;
  info_type: string;
}

export interface IStoryDescription {
  entity_details_id: number;
  entity_type: string;
  id: number;
  info_1: string;
  info_3: string;
  info_type: string;
}
export interface IStoryTitle {
  entity_details_id: number;
  entity_type: string;
  id: number;
  info_1: string;
  info_3: string;
  info_type: string;
}

export interface IMediaBeneficiary {
  cdn_path: string;
  file_name: string;
  id: number;
  media_type: string;
  path: string;
}

export interface IVideoAppeal {
  cdn_path: string;
  file_name: string;
  id: number;
  media_type: string;
  path: string;
}

export interface ISupportCampaign {
  amount_requested: string;
  appeal: string;
  campaign_id: number;
  created_at: string;
  creator_entity_details_id: number;
  creator_name: string;
  custom_tag: string;
  id: number;
  reason: string;
  status_flag: string;
  type: string;
  updated_at: string;
  entity: ISupportEntity;
}
export interface IOrganiser {
  access_url: string;
  address_1: string;
  address_2: string;
  address_3: string;
  email: string;
  entity_type: string;
  fname: string;
  full_name: string;
  gender: string;
  id: number;
  lname: string;
  no_80g: boolean;
  phone_1: string;
  status_flag: number;
  tax_benefit: boolean;
  user_details_id: number;
}

export interface ISupportEntity {
  avtar: ISupportAvatar;
  email: string;
  entity_type: string;
  fname: string;
  full_name: string;
  id: number;
  lname: string;
  phone_1: string;
  tax_benefit: boolean;
  user_details_id: number;
}

export interface ISupportAvatar {
  cdn_path: string;
  entity_type: string;
  entity_type_id: number;
  file_name: string;
  media_type: string;
}

export interface ICouponInfo {
  campaign_id: number;
  coupon_id: number;
  redeem_transfer_apply: {
    coupon_code: string;
    created_at: string;
    created_by: number;
    criteria: string;
    description: string;
    id: number;
    status_flag: number;
    type: string;
    updated_at: string;
  };
}
