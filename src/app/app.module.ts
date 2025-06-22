import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, provideHttpClient,HttpClientModule } from '@angular/common/http';
 
import { DataService } from './shared/srv/data.service';
import { IndexedDbService } from './shared/srv/indexed-db.service';
import { AdsService } from './shared/srv/ads.service';
import { DeviceBackBtnService } from './shared/srv/device-back-btn.service';
import { ConfirmExitPopoverComponent } from './components/confirm-exit-popover/confirm-exit-popover.component';
import { PermissionService } from './shared/srv/permission.service';
import { NetworkService } from './shared/srv/network.service';
import { SharedModule } from './shared/shared-module/shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FuelCostStorageService } from './shared/srv/fuel-cost-storage.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AuthService } from './shared/srv/auth.service';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,ConfirmExitPopoverComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,SharedModule,HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    FuelCostStorageService,
    DataService,
    IndexedDbService,
    AdsService,
    DeviceBackBtnService,
    PermissionService,
    NetworkService,
    AuthService
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
