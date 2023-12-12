import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-common-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './common-header.component.html',
  styleUrl: './common-header.component.scss'
})
export class CommonHeaderComponent {

  environment: any;
  logoUrlLight: string = '';

  onLogoClick(e: any) {

  }

}
