
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  AdLoadInfo,
  AdMob,
  AdMobError,
  AdMobRewardItem,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
  InterstitialAdPluginEvents,
  RewardAdOptions,
  RewardAdPluginEvents
} from '@capacitor-community/admob';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { LoadingService } from './loading.service';

@Injectable()
export class AdsService {

  isBannerShown: boolean = false; // Track banner state
  isBannerHidden: boolean = false;
  
  appLovin: any;
  marginTop = 0;

  // Android Ads ID 
  ANDROID_ADMOB_BANNER_ID = 'ca-app-pub-1047405219515945/2955326580';
  ANDROID_ADMOB_REWARDED_ID = 'ca-app-pub-1047405219515945/9340803359';
  ANDROID_ADMOB_INTERSTITAIL_REWARDED_ID = 'ca-app-pub-1047405219515945/7313405815';
  ANDROID_ADMOB_INTERSTITAIL_ID = 'ca-app-pub-1047405219515945/8601586699';
  // ANDROID_ADMOB_NATIVE_AD_ID = 'ca-app-pub-1047405219515945/2690181829';

  constructor(
    public http: HttpClient,
    public alertController: AlertController,
    public router: Router,
    public platform: Platform,
    public loadingService: LoadingService
  ) {}

  async initializeAdMobSDK() {
    await AdMob.initialize();
  }

  async showAdMobBanner() {
    if (this.isBannerShown) {
      return;
    }

    try {
      const options: BannerAdOptions = {
        adId: this.ANDROID_ADMOB_BANNER_ID,
        adSize: BannerAdSize.FULL_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        // isTesting: true,
      };
     await AdMob.showBanner(options);
  
      this.isBannerShown = true;
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  }

 async hideAdMobBanner() {
    await AdMob.hideBanner();
  }

 async resumeAdMobBanner() { 
    await AdMob.resumeBanner();
  }

  hideAdMobBanner_old(isResume: boolean) {
    if (isResume) {
      this.isBannerHidden = true;
      AdMob.hideBanner();
    } else {
      this.resumeAdMobBanner();
    }
  }

  resumeAdMobBanner_old() { 
    try {
      // console.log('resumeAdMobBanner banner ad...');
      AdMob.resumeBanner();
      this.isBannerHidden = false;
      // console.log('resumeAdMobBanner ad successfully');
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }

  removeAdMobBanner() {
    AdMob.removeBanner();
    this.isBannerShown = false;
  }

  async showAdMobRewardedAd() {
    this.loadingService.startLoader();
    AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      // this.loadingService.stopLoader();
    });

    AdMob.addListener(
      RewardAdPluginEvents.FailedToLoad,
      (error: AdMobError) => {
        setTimeout(() => {
        this.loadingService.stopLoader();
        }, 3000);
      },
    );

    const updateToken = await AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (rewardItem: AdMobRewardItem) => {
        // console.log(rewardItem);
        updateToken.remove();
        this.loadingService.stopLoader();  
      }
    );

    const options: RewardAdOptions = {
      adId: this.ANDROID_ADMOB_INTERSTITAIL_REWARDED_ID,
      // isTesting: true,
    };
    await AdMob.prepareRewardVideoAd(options);
    await AdMob.showRewardVideoAd();
  }

  async showAdMobInterstitialAd() {
    this.loadingService.startLoader();
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      setTimeout(() => {
        this.loadingService.stopLoader();
        }, 3000);
    });

    AdMob.addListener(
      InterstitialAdPluginEvents.FailedToLoad,
      (error: AdMobError) => {
        setTimeout(() => {
        this.loadingService.stopLoader();
        }, 3000);
      },
    );

    const options: RewardAdOptions = {
      adId: this.ANDROID_ADMOB_INTERSTITAIL_ID,
      // isTesting: true,
    };
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }

  async getSafeArea() {
    return await SafeArea.getSafeAreaInsets();
  }
}