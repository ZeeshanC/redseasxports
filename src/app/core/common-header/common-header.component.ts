import { Component, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { UtilService } from '../../shared/services/util/util.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-common-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatIconModule, MatMenuModule],
  templateUrl: './common-header.component.html',
  styleUrl: './common-header.component.scss'
})
export class CommonHeaderComponent {
  isMobile: any;
  isIos: any;
  customLogoLink = '';
  logoUrlLight: any;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  public environment = environment;

  constructor(
    public utilService: UtilService,
  ) { }

  ngOnInit() {
    this.isMobile = this.utilService.isMobile();
  }

  /**logo click listner */
  onLogoClick(event: any) {

  }
}
