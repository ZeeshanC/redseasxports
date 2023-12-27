import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxGlideModule } from 'ngx-glide';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-homepage-banner',
  standalone: true,
  imports: [CommonModule, NgxGlideModule, SlickCarouselModule],
  templateUrl: './homepage-banner.component.html',
  styleUrl: './homepage-banner.component.scss'
})
export class HomepageBannerComponent {

  gallery = [
    { img: 'assets/images/tobacco_1.jpg', text: 'Achieve an unrivaled smoking experience with our innovative tobacco accessories. Explore our curated selection of premium pipes, rolling papers, filters, and lighters - meticulously designed to elevate every puff. Enhance your enjoyment and make a statement with our stylish smoking accessories. Join our community of tobacco enthusiasts and embark on an unforgettable journey of taste and sophistication. With our exceptional customer service, we are always here to assist you in finding the perfect tobacco blends and accessories tailored to your unique preferences. Step into the world of superior tobacco products at Red Sea Exports. Indulge your senses, embrace the art of tobacco enjoyment, and savor every moment. Shop now and let us guide you to the pinnacle of tobacco pleasure.' },
    { img: 'assets/images/tobacco_2.jpg', text: 'Indulge in the exquisite world of tobacco with Red Sea Exports. As a leading online retailer, we bring you a captivating collection of premium quality tobacco products, handpicked from the most reputable tobacco regions. Experience the rich flavors, meticulously crafted to satisfy the most discerning connoisseurs. From smooth blends to robust varieties, our extensive range offers something for every preference. Immerse yourself in the unique aromas and embrace the true essence of tobacco pleasure. At Red Sea Exports, we are committed to delivering an unparalleled shopping experience. With our user-friendly website and secure payment options, placing your order is effortless and convenient. Our reliable and discreet shipping ensures your tobacco arrives safely at your doorstep, ready to enhance your smoking rituals.' }
  ];
  slickConfig = {
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    CenterMode: true,
    infinite: true,
    swipe: true,
    speed: 300,
    useCSS: true
  };

}
