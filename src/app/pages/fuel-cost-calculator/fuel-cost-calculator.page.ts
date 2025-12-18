// src/app/pages/fuel-cost-calculator/fuel-cost-calculator.page.ts
import { ChangeDetectorRef, Component } from '@angular/core';
 
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';
import { NavController, ToastController } from '@ionic/angular';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { SaveDataService } from 'src/app/shared/srv/save-data.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-fuel-cost-calculator',
  templateUrl: './fuel-cost-calculator.page.html',
  styleUrls: ['./fuel-cost-calculator.page.scss'],
})
export class FuelCostCalculatorPage {
  distance: any;
  average: any;
  fuelPrice: any;
  result: any;
  fuelType: any;
 
  constructor(
    public fuelCostStorage: FuelCostStorageService,
    private saveDataService: SaveDataService,
    public toastController: ToastController,
    public navCtrl: NavController,
    private cd: ChangeDetectorRef,
    public utilService: UtilService,
    public adsService: AdsService,
    public loadingService: LoadingService
  ) {}

  calculateFuelCost() {
    // const record:any = {
    //   distance: this.distance,
    //   average: this.average,
    // }
    // this.saveDataService.openSaveModal(record);
    // this.adsService.showAdMobInterstitialAd();
    if (this.distance && this.average && this.fuelPrice) {
      this.loadingService.startLoader();
        setTimeout(() => {
          const litersNeeded = this.distance / this.average;
          this.result = parseFloat((litersNeeded * this.fuelPrice).toFixed(2));
          this.loadingService.stopLoader();
        }, 3000);
    } else {
      this.presentToast('Please fill in all fields.');
      this.loadingService.stopLoader();
    }
    this.cd.detectChanges();
  }

  async saveRecord() {
    this.adsService.showAdMobInterstitialAd();
    this.fuelType = localStorage.getItem("selectedFuel") || "PETROL";
    if (this.result !== null) {
      const record: FuelCostRecord = {
        distance: this.distance,
        average: this.average,
        fuelPrice: this.fuelPrice,
        totalCost: this.result,
        fuelType: this.fuelType,
        calculationType: 'FUEL_COST',
        title: 'CALCULATE_FUEL_COST',
        date: new Date().toISOString(),
      };

      const action = await this.saveDataService.openSaveModal(record);
      if (action === 'save' || action === 'saveWithoutData') {
        this.resetForm();
      } else if (action === 'cancel') {
        // Handle cancel action - form remains as is
        console.log('User cancelled the save operation');
      }
    } else {
      this.utilService.showToast('No result to save.', 2000, 'warning');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  goBack() {
    window.history.back();
  }

  resetForm() {
    this.distance = null;
    this.average = null;
    this.fuelPrice = null;
    this.result = null;
    this.fuelType = null;
  }
}
