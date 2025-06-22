import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OfflineMessageComponent } from 'src/app/components/offline-message/offline-message.component';
import { LanguagePopoverComponent } from 'src/app/components/language-popover/language-popover.component';
import { TranslateModule } from '@ngx-translate/core';
import { VehiclePopoverComponent } from 'src/app/components/vehicle-popover/vehicle-popover.component';



@NgModule({
  declarations: [
    OfflineMessageComponent, 
    LanguagePopoverComponent,
    VehiclePopoverComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    OfflineMessageComponent,
    TranslateModule,
    LanguagePopoverComponent,
    VehiclePopoverComponent]
})
export class SharedModule { }
