import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanguageSelectionPageRoutingModule } from './language-selection-routing.module';

import { LanguageSelectionPage } from './language-selection.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LanguageSelectionPageRoutingModule
  ],
  declarations: [LanguageSelectionPage]
})
export class LanguageSelectionPageModule {}
