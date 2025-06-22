import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-popover',
  templateUrl: './vehicle-popover.component.html',
  styleUrls: ['./vehicle-popover.component.scss'],
})
export class VehiclePopoverComponent   {
  constructor(
    private popoverCtrl: PopoverController,
    private navCtrl: NavController
  ) {}

  selectVehicle(vehicle: string) {
    // Perform any logic or store selection
    this.popoverCtrl.dismiss();
    this.navCtrl.navigateRoot('/home'); // Navigate to Home Page
  }
}
