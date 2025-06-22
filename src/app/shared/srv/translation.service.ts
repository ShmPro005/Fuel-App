import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {

  constructor(
    private translate: TranslateService,
    public router: Router,
    public utilService: UtilService
    ) {}


  changeFuelType() {
    this.utilService.updateState('changeFuelType');
    this.router.navigate(['tabs/language-selection']);
  }
  changeLanguage() {
    this.utilService.updateState('changeLanguage');
    this.router.navigate(['tabs/language-selection']);
  }
  initTranslate() {
    // Default language can be English
      // Set the default language
      // this.translate.setDefaultLang('en');
      const storedLang = localStorage.getItem('appLanguage');

      // Set the default language to English if no stored language is found
      // this.translate.setDefaultLang('en');

      if (storedLang) {
        this.translate.use(storedLang);
      } else {
        // Optionally, use the browser's language
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang?.match(/en|hi|gu/) ? browserLang : 'en');
      }
  
    
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('appLanguage', lang);
  }
}
