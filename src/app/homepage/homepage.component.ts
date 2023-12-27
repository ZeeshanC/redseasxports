import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomepageBannerComponent } from '../core/homepage-banner/homepage-banner.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, HomepageBannerComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
