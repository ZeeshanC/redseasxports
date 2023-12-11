/**Claver tab object interface */
export interface IClavertap {
  mode?: string;
  device_type?: string;
  page_url?: string;
  session_id?: string;
  ip_address?: string;
  browser?: string;
  email?: string;
  user_type?: string;
}
/**VWO AB Testing Object interface */
export interface IVWO {
  event_name?: string;
  event_type?: string;
  event_type_id?: string;
  page_name?: string;
  ab_testname?: string;
  ab_value?: string;
  referrer_page?: string;
}
/**SYstem Event object interface */
export interface ISystemEvent {
  eventName?: string;
  event_type?: string;
  page_name?: string;
  event_type_id?: any;
  referrer_page?: string;
  info_1?: string;
  info_2?: string;
  info_3?: string;
  info_4?: string;
  event?: string;
  event_category?: string;
  event_action?: string;
  event_label?: string;
}
