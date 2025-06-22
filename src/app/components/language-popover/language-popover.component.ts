import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslationService } from 'src/app/shared/srv/translation.service';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.component.html',
  styleUrls: ['./language-popover.component.scss'],
})
export class LanguagePopoverComponent {

  constructor(
    private popoverCtrl: PopoverController,
    private translationService: TranslationService
  ) {}

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.popoverCtrl.dismiss();
  }
}
