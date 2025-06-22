import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { UtilService } from 'src/app/shared/srv/util.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  constructor(
    public adsService: AdsService,
    public utilService: UtilService) { }

  ngOnInit() {
     setTimeout(() => {
      this.utilService.redirectTo = '';
     }, 500);
      // this.adsService.hideAdMobBanner();
  }

}
