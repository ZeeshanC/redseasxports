import { Injectable } from '@angular/core';
import { UtilService } from '../../services/util/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    public util: UtilService
  ) { }

}