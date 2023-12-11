import { ICart } from './cart.model';
import { IFundraiser } from './fundraiser.model';
import { IOrder } from './order.model';
import { IUser } from './user.model';

export interface IPaymentConfig {
  amount?: number;
  campaign_id?: number;
  cart?: ICart;
  button_id?: string;
  currency?: string;
  btn_label?: string;
  fundraiser?: IFundraiser;
  theme?: string;
  min_amount?: boolean;
  origin?: string;
  order?: IOrder;
  page?: string;
  payment_options?: {
    gateway: string,
    options: any,
    setting: any
  };
  user?: IUser;
}

export const SIP_PAYMENT_DEFAULT_CONFIG: IPaymentConfig = {
  currency: 'INR',
  origin: 'am',
};
