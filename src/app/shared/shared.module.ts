import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './pipes/date-format/date-format.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterService } from './services/http-inter/http-inter.service';
import { VariableService } from './services/variable/variable.service';
import { ScriptLoaderService } from './services/script-loader/script-loader.service';
import { StorageService } from './services/storage/storage.service';
import { UtilService } from './services/util/util.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencySymbolPipe } from './pipes/currencysymbol/currency.pipe';
import { CookieService } from './services/cookie/cookie.service';
import { ApiService } from './services/api/api.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { DialogService } from './services/dialog/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';

const Services = [
  ApiService,
  AuthGuard,
  CookieService,
  ScriptLoaderService,
  StorageService,
  UtilService,
  VariableService,
  DialogService
];


@NgModule({
  declarations: [
    DateFormatPipe,
    CurrencySymbolPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [
    DateFormatPipe,
    CurrencySymbolPipe
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ...Services,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterService,
          multi: true
        }
      ]
    };
  }
}
