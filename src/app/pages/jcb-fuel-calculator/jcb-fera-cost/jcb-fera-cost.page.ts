import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { SaveDataService } from 'src/app/shared/srv/save-data.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';

@Component({
  selector: 'app-jcb-fera-cost',
  templateUrl: './jcb-fera-cost.page.html',
  styleUrls: ['./jcb-fera-cost.page.scss'],
})
export class JcbFeraCostPage {
  distanceKm: number = 0;
  costPerKm: number = 0;
  additionalCharges: number = 0;
  totalCost: number | null = null;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private router: Router,
    private fuelCostStorage: FuelCostStorageService,
    private saveDataService: SaveDataService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) { }

  goBack() {
    this.router.navigate(['/jcb-fuel-calculator']);
  }

  calculateFeraCost() {
    if (this.distanceKm && this.costPerKm) {
      // this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
        const baseCost = this.distanceKm * this.costPerKm;
        this.totalCost = baseCost + (this.additionalCharges || 0);
        this.loadingService.stopLoader();
      }, 3000);
    }
  }

  async saveRecord() {
    this.adsService.showAdMobInterstitialAd();
    if (this.totalCost !== null) {
      const record: FuelCostRecord = {
        distanceKm: this.distanceKm,
        costPerKm: this.costPerKm,
        totalCost: this.totalCost,
        fuelType: "JCB",
        date: new Date().toISOString(),
        calculationType: 'FERA_COST',
        title: 'JCB_FERA_COST_CALCULATION',
      };

      const action = await this.saveDataService.openSaveModal(record);
      console.log('Action returned:', action);

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

  resetForm() {
    this.distanceKm = 0;
    this.costPerKm = 0;
    this.additionalCharges = 0;
    this.totalCost = null;
  }
}
