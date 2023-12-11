export interface ICart {
  campaign_id?: number;
  currency?: string;
  donated_amount?: number;
  donated_amount_inr?: number;
  donor_address?: string;
  donor_email?: string;
  donor_entity_details_id?: number;
  donor_name?: string;
  donor_phone?: number;
  donor_pincode?: number;
  id?: number;
  is_anonymous?: number;
  pan?: string;
  recurring?: false;
  status_flag?: true;
  selected_currency?: string;
  donated_amount_local?: string;
  donor_extension?: string;
  indian?: any;
  tip_amount?: number;
  tip_amount_inr?: number;
  skipCardPrefil?: boolean;
  reward_id?: boolean;
  sip_cause?: string;
  slabs?: Array<number>;
  bulkdonation?: any;
}
