import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../../models/currency-list';

@Pipe({
  name: 'currencysymbol'
})
export class CurrencySymbolPipe implements PipeTransform {
  currencies = Currency;

  transform(value: string, ...args: any): unknown {
    return this.currencies.find((item) => item.currency === value)?.symbol.toString();
  }

}
