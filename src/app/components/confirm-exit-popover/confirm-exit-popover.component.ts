import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';

@Component({
  selector: 'app-confirm-exit-popover',
  templateUrl: './confirm-exit-popover.component.html',
  styleUrls: ['./confirm-exit-popover.component.scss'],
})
export class ConfirmExitPopoverComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
    public adsService: AdsService
    ) {}

  ngOnInit(): void {
    
  }


  confirmExit() {
    this.popoverController.dismiss({ confirmExit: true });
  }

  cancelExit() {
    this.popoverController.dismiss({ confirmExit: false });
  }
}
