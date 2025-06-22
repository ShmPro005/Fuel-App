import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {

    private stateSubject = new BehaviorSubject<any>('');
    state$ = this.stateSubject.asObservable();

    private updateFuelType = new BehaviorSubject<boolean>(false);
    fuelState$ = this.updateFuelType.asObservable();
    
    loading: HTMLIonLoadingElement | null = null;
    isLoading: boolean = false; // Track loading state
    redirectTo: any = '';
    isOnline = true;
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  updateState(newState: any) {
    this.stateSubject.next(newState);
  }

  updateFuelState(newState:any) {
    this.updateFuelType.next(newState)
  }
  
  // Show a loading spinner
  async showLoading(message: string = 'Please wait...') {
    if (this.isLoading) {
      console.warn('Loading is already active, skipping duplicate call');
      return;
    }

    this.isLoading = true;

    this.loading = await this.loadingController.create({
      // message,
      spinner: 'lines', 
      cssClass: 'custom-loading', 
      backdropDismiss: false,
    });

    await this.loading.present();
  }

  // Dismiss the loading spinner
  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
    this.isLoading = false;
  }

    async showMessageModal(title: string, message: string, buttonText: string = 'OK') {
      const alert = await this.alertController.create({
        header: title, // Set the title
        message: message, // Set the message
        buttons: [
          {
            text: buttonText,
            cssClass: 'alert-button-primary', // Optional custom button class
            handler: () => {
              
            },
          },
        ],
        cssClass: 'alert-modal-class', // Optional class for styling
        backdropDismiss: true, // Prevent closing by tapping outside
      });
    
      await alert.present();
    }
 
  // Show a confirmation alert
  async showConfirmationAlert(
    message: string,
    confirmHandler: () => void,
    cancelHandler?: () => void
  ) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: cancelHandler,
        },
        {
          text: 'Yes',
          handler: confirmHandler,
        },
      ],
    });

    await alert.present();
  }

  
  async showToast(message: string, duration: number = 1000, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color, // You can use 'success', 'danger', 'warning', etc.
      position: 'top', // Position: 'top', 'middle', 'bottom'
    });
    await toast.present();
  }


   /**
   * ✅ Allow Only Letters for Name & Surname
   */
   allowOnlyLetters(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
      event.preventDefault();
    }
  }

  /**
   * ✅ Allow Only Numbers for Phone Number
   */
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (!(charCode >= 48 && charCode <= 57)) {
      event.preventDefault();
    }
  }

}
