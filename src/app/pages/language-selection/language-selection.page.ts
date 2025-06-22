// Component TypeScript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/shared/srv/translation.service';
import { UtilService } from 'src/app/shared/srv/util.service';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.page.html',
  styleUrls: ['./language-selection.page.scss'],
})
export class LanguageSelectionPage implements OnInit {
  selectedLanguage: string | null = null;
  showLanguageSelection: boolean = true;
  showFuelSelection: boolean = false;
  private stateSubscription!: Subscription;

  constructor(
    private router: Router,
    private translationService: TranslationService,
    public utilService: UtilService
  ) {
    this.stateSubscription = this.utilService.state$.subscribe((newState) => {
      // console.log('-----Received state update-----', newState);
      if (newState === 'changeLanguage') {
        localStorage.removeItem('appLanguage');
        this.showLanguageSelection = true;
        this.showFuelSelection = false;
      } else if (newState === 'changeFuelType') {
        localStorage.removeItem('selectedFuel');
        this.showLanguageSelection = false;
        this.showFuelSelection = true;
      }
    });
  }

  ngOnInit() {
    this.checkStoredSelections();
  }

  ngOnDestroy() {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }

  /**
   * Check if language and fuel are already selected
   * - If both found, redirect to appropriate page
   * - Otherwise, show the appropriate selection screen
   */
  private checkStoredSelections() {
    const storedLanguage = localStorage.getItem('appLanguage');
    const selectedFuel = localStorage.getItem('selectedFuel');
    const isLoggedIn = localStorage.getItem('userToken');
    if(!isLoggedIn){
      this.router.navigate(['/user-login']);
    }

    if (storedLanguage && selectedFuel) {
      // Both language and fuel are selected, redirect to home/login
      this.selectedLanguage = storedLanguage;
      // console.log('----selectedLanguage----01',this.selectedLanguage);
      this.router.navigate(['/tabs/home']);
    } else if (storedLanguage && !selectedFuel) {
      // Language selected but not fuel, show fuel selection
      this.selectedLanguage = storedLanguage;
      this.translationService.setLanguage(storedLanguage);
      this.showLanguageSelection = false;
      this.showFuelSelection = true;
    } else {
      // Nothing selected, show language selection
      this.showLanguageSelection = true;
      this.showFuelSelection = false;

    }
  }

  /**
   * Store selected language and proceed to fuel selection
   */
  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
    this.selectedLanguage = lang;
    
    // After language selection, show fuel selection
    this.showLanguageSelection = false;
    this.showFuelSelection = true;
  }

  /**
   * Store selected fuel type and redirect to appropriate screen
   */
  selectFuel(fuel: string) {
    this.utilService.showLoading();
    localStorage.setItem('selectedFuel', fuel);
    this.utilService.updateFuelState(fuel);
    
    this.navigateToNextScreen();
  }

  /**
   * Navigate to the appropriate screen based on login status
   */
  private navigateToNextScreen() {
    const isLoggedIn = localStorage.getItem('userToken');
    setTimeout(() => {
      if (isLoggedIn) {
        this.router.navigate(['/tabs/home']);
      } else {
        this.router.navigate(['/user-login']);
      }
      this.utilService.dismissLoading();
    }, 500);
  }
}