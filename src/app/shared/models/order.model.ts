import { IFundraiser } from "./fundraiser.model";

export interface IOrder {
  bulkdonation?: any[];
  campaign: IFundraiser;
  campaign_id: number;
  cause_id: number;
  creator_entity_details_id: number;
  currency: number;
  device: null;
  donated_amount: number;
  donated_amount_local: number;
  donor_address: string;
  donor_city: null;
  donor_country: string;
  donor_email: string;
  donor_entity_details_id: number;
  donor_first_name: string;
  donor_display_name: string;
  donor_phone: string;
  donor_pincode: string;
  donor_state: null;
  entity_details_id: number;
  id: number;
  is_anonymous: number;
  iso_currency: string;
  ketto_commission: string;
  order_id: string;
  payment_gateway: string;
  payment_mode: string;
  payment_mode_value: string;
  rewards_id: number;
  donoravtar: any;
  donor: IDonor;
  tip_amount: number;
  tip_amount_local: number;
  tip_amount_inr: number;
  recurring: any;
  subscription_id: any;
  checksum: string;
  transaction_return_status: string;
  visited_thankyou: boolean;
  offer: boolean;
  auto_pay_m1?: any;
  coupon?: any;
}

export interface IDonor {
  access_url: string;
  address_1: string;
  address_2: string;
  address_3: string;
  age: string;
  city: string;
  disable_foreign_donation: number;
  display_type: string;
  email: string;
  entity_type: string;
  extension: string;
  fname: string;
  full_name: string;
  name: string;
  gender: string;
  id: number;
  is_subscribed: number;
  last_communication_date: string;
  lname: string;
  no_80g: boolean;
  phone_1: string;
  phone_2: string;
  pincode: string;
  priority: string;
  status_flag: number;
  tax_benefit: boolean;
  updation_time: string;
  user_details_id: number;
  user_role: string;
  username: string;
  activation: {
    creation_date: string,
    order_details_id?: string
  };
  comments: any[];
}
