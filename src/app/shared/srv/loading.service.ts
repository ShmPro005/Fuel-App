import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomLoaderComponent } from 'src/app/components/custom-loader/custom-loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  modal: any;

  constructor(public modalCtrl: ModalController,) { }


  
  async startLoader() {
    this.modal = await this.modalCtrl.create({
      component: CustomLoaderComponent,
      cssClass: 'loader-modal',
      backdropDismiss: false,
    });

    return await this.modal.present();
  }

  stopLoader() {
    this.modal.dismiss();
  }

}
