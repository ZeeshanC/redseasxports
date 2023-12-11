import { Directive, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { ScriptLoaderService } from '../services/script-loader/script-loader.service';

declare const google: any;

@Directive({
  selector: '[appPlaceAutocomplete]',
  standalone: true
})
export class PlaceAutocompleteDirective {

  public element;
  @Input() placeType = '(cities)';
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  public address: any = {}

  constructor(
    public el: ElementRef,
    public scriptLoaderService: ScriptLoaderService
  ) {
    this.element = el.nativeElement;
    this.loadLibrary();
  }

  /**Get the required response */
  formateRes(addressComponent: any, address: any) {
    this.address['formatted_address'] = address;
    for (const item of addressComponent) {
      if (item.types.includes('locality')) {
        this.address['address_1'] = item.long_name;
      } else if (item.types.includes('administrative_area_level_1')) {
        this.address['address_2'] = item.long_name;
      } else if (item.types.includes('country')) {
        this.address['address_3'] = item.long_name;
      } else if (item.types.includes('postal_code')) {
        this.address['postal_code'] = item.long_name;
      }
    }
    this.onSelect.emit(this.address);
  }

  /**Google Map event listner */
  mapListner() {
    const autocomplete = new google.maps.places.Autocomplete(this.element, {
      types: [`${this.placeType}`]
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.formateRes(place.address_components, place.formatted_address);
    });
  }

  /**Load the Google Maps JS Library */
  loadLibrary() {
    this.scriptLoaderService.loadScript('googlemaps').then((data) => {
      this.mapListner();
    }).catch(error => { });
  }

}
