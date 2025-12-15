import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Share } from '@capacitor/share';
import { TranslateService } from '@ngx-translate/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { TranslationService } from 'src/app/shared/srv/translation.service';
import { UtilService } from 'src/app/shared/srv/util.service';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  isMenuOpen = false;
  appUrl: string = '';
  userData: any = {}; // Store user data from local storage

  constructor(
    public adsService: AdsService,
    public utilService: UtilService,
    public router: Router,
    public translationService: TranslationService,
    public translateService: TranslateService
     
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const storedUser = localStorage.getItem('userData');
    this.userData = storedUser ? JSON.parse(storedUser) : null;
  }

  onMenuOpen() {
    // this.adsService.hideAdMobBanner();
  }

  onMenuClose() {
    // if(this.utilService.redirectTo === 'privacy-policy') {
    //   this.adsService.hideAdMobBanner();
    // } else {
    //   this.utilService.redirectTo = '';
    //   this.adsService.hideAdMobBanner();
    // }
  }

  redirectToPrivacy() {
    this.utilService.redirectTo = 'privacy-policy';
    this.router.navigate(['/tabs/privacy-policy']);
  }

  otherApplication() {
    window.open('https://play.google.com/store/apps/details?id=com.ms.imageTotext', '_blank');
  }
  
  writeReview() {
    window.open('https://play.google.com/store/apps/details?id=com.msproducts.fuelApp', '_blank');
  }

  async shareApps() {
    const shareAppUrl = 'https://play.google.com/store/apps/details?id=com.msproducts.fuelApp';
    this.utilService.showLoading('Sharing...');
  
    const selectedLanguage = this.translateService.currentLang || 'en';
  
    const appDetails: any = {
      en: `⛽ Fuel Calculation Made Easy! 🚗💨
  
  Calculate fuel costs and efficiency effortlessly with our smart fuel calculation app! Know your trip costs before hitting the road.
  
  🛢️ CNG, Petrol, and Diesel fuel type calculations.

  📊 Key Features:
  ✅ Calculate total fuel cost, mileage, and fuel efficiency.
  ✅ Keep track of your fuel expenses with history logs.
  ✅ Simple and user-friendly interface.
  ✅ Instant sharing of trip details with friends and family.
  
  📲 Download now: ${shareAppUrl}
  After installing, view the shared record under the 'History' section.`,
  
      hi: `⛽ ईंधन गणना आसान! 🚗💨
  
  हमारे स्मार्ट ईंधन गणना ऐप के साथ अपने यात्रा खर्चों की गणना करें! सड़क पर जाने से पहले अपने यात्रा खर्चों को जानें।
  
  🛢️ सीएनजी, पेट्रोल और डीजल ईंधन प्रकार की गणना का समर्थन करता है।

  📊 मुख्य विशेषताएँ:
  ✅ कुल ईंधन लागत, माइलेज और दक्षता की गणना करें।
  ✅ अपने ईंधन खर्चों का रिकॉर्ड रखें।
  ✅ सरल और उपयोगकर्ता के अनुकूल इंटरफ़ेस।
  ✅ यात्रा विवरण तुरंत साझा करें।
  
  📲 अभी डाउनलोड करें: ${shareAppUrl}
  इंस्टॉल करने के बाद, साझा किए गए रिकॉर्ड को 'इतिहास' अनुभाग में देखें।`,
  
      gu: `⛽ સરળ ઇંધણ ગણતરી! 🚗💨
  
  અમારા સ્માર્ટ ઇંધણ ગણતરી એપ સાથે તમારા પ્રવાસ ખર્ચોની ગણતરી કરો! રોડ પર જવા માટે તમારા ખર્ચો જાણો.
  
  💰🛢️ સીએનજી, પેટ્રોલ અને ડીઝલ પ્રકારના ઇંધણ ખર્ચની ગણતરી કરવામાં મદદ કરે છે.

  📊 મુખ્ય Features:
  ✅ કુલ ઇંધણ ખર્ચ, માઈલેજ અને કાર્યક્ષમતા ગણો.
  ✅ તમારા ઇંધણ ખર્ચોના રેકોર્ડ રાખો.
  ✅ સરળ અને વપરાશકર્તા મૈત્રીપૂર્ણ ઇન્ટરફેસ.
  ✅ પ્રવાસ વિગતો તાત્કાલિક શેર કરો.
  
  📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}`
    };
  
    const message = appDetails[selectedLanguage] || appDetails.en;
  
    try {
      await Share.share({
        title: this.translateService.instant('SHARE_TITLE'),
        text: message,
        dialogTitle: this.translateService.instant('SHARE_DIALOG_TITLE')
      });
  
      this.utilService.dismissLoading();
    } catch (error) {
      console.error('Sharing failed:', error);
      this.utilService.dismissLoading();
    }
  }
  

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    // localStorage.removeItem('appLanguage');
    localStorage.removeItem('selectedFuel');
    this.utilService.updateState('changeLanguage');
    this.router.navigate(['/user-login']); // Redirect to login page
  }
}
