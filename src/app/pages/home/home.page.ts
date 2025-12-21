import { Component, OnInit, HostListener } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TranslationService } from 'src/app/shared/srv/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cardHeight: number = 0;
  isSmallRatio: boolean = false;
  selectedFuel: string = '';

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public translationService: TranslationService) {}

  ngOnInit() {
    const selectedFuel = localStorage.getItem('selectedFuel');
    if(!selectedFuel){
      this.translationService.changeFuelType()
    }else{
      this.selectedFuel = selectedFuel || '';
    }
    // Call setCardHeight on init to set initial sizes
    this.setCardHeight();
  }

  // Listen for window resize events
  @HostListener('window:resize')
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

  goToFuelCostCalculator() {
    this.navCtrl.navigateForward('/tabs/fuel-cost-calculator');
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

  goToHistory() {
    this.navCtrl.navigateForward('/tabs/history');
  }

  goToTractorFuelCalculator() {
    this.navCtrl.navigateForward('/tabs/tractor-fuel-calculator');
  }

  goToMiniTractorFuelCalculator() {
    this.navCtrl.navigateForward('/tabs/mini-tractor-fuel-calculator');
  }

  goToJcbFuelCalculator() {
    this.navCtrl.navigateForward('/tabs/jcb-fuel-calculator');
  }

  goToMore() {
    this.navCtrl.navigateForward('/tabs/more');
  }
}
