import { Component, OnInit, HostListener } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  cardHeight: number = 0;

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    this.setCardHeight();
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setCardHeight();
  }

  setCardHeight() {
    // Calculate dynamic card height based on screen size and orientation
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth <= 576) {
      if (screenHeight < 700) {
        // Small mobile devices in landscape
        this.cardHeight = 70;
      } else {
        // Small mobile devices in portrait
        this.cardHeight = 80;
      }
    } else if (screenWidth <= 992) {
      // Tablets and medium-sized screens
      this.cardHeight = 90;
    } else {
      // Larger screens
      this.cardHeight = 100;
    }
  }

  goBack() {
    window.history.back();
  }
  goToTimeCalculator() {
    this.navCtrl.navigateForward('/tabs/time-calculator');
  }

  goToRangeCalculator() {
    this.navCtrl.navigateForward('/tabs/range-calculator');
  }
  goToFuelQuantityCalculator() {
    this.navCtrl.navigateForward('/tabs/fuel-quantity-calculator');
  }

  goToFuelQuantityPriceCalculator() {
    this.navCtrl.navigateForward('/tabs/fuel-quantity-price');
  }
  onButton1Click() {
    // Add functionality for first button
    console.log('Button 1 clicked');
  }

  onButton2Click() {
    // Add functionality for second button
    console.log('Button 2 clicked');
  }
}
