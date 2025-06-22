import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    SelectDropDownModule,
    ImageCropperModule,
    SharedModule
  ],
  declarations: [HomePage],
  
})
export class HomePageModule {}
