import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConfirmExitPopoverComponent } from 'src/app/components/confirm-exit-popover/confirm-exit-popover.component';

@Injectable({
  providedIn: 'root',
})
export class DeviceBackBtnService {
  private backPressCount = 0;
  private backPressTimer: any;
  private isPopoverOpen = false; // Track if the popover is open

  constructor(
    private platform: Platform,
    private popoverController: PopoverController,
    private router: Router
  ) {}

  initializeBackButtonHandler() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (currentUrl.includes('/tabs/home')) {
        // Handle exit popover for Home tab
        this.handleExit();
      } else if (currentUrl.includes('/tabs/scan')) {
        // Navigate to Home tab from Scan
        this.router.navigate(['/tabs/home']);
      } else {
        // Default behavior for other tabs
        this.router.navigate(['/tabs/home']);
      }
    });
  }

  private async handleExit() {
    // If the popover is already open, do nothing
    if (this.isPopoverOpen) {
      return;
    }

    if (this.backPressCount === 0) {
      this.backPressCount++;
      this.backPressTimer = setTimeout(() => {
        this.backPressCount = 0;
      }, 2000);

      return;
    }

    clearTimeout(this.backPressTimer);
    this.backPressCount = 0;

    // Set the flag to indicate the popover is open
    this.isPopoverOpen = true;

    const popover = await this.popoverController.create({
      component: ConfirmExitPopoverComponent,
      backdropDismiss: false,
      cssClass: 'custom-popover-class',
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();

    // Reset the flag after the popover is dismissed
    this.isPopoverOpen = false;

    if (data && data.confirmExit) {
      App.minimizeApp(); // Exit the app
    }
  }
}
