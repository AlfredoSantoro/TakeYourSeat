import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {LoginComponent} from "./component/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HTTP} from "@ionic-native/http/ngx";
import {MenuComponent} from "./component/menu/menu.component";
import {HomepageComponent} from "./component/homepage/homepage.component";
import {SeatComponent} from "./component/seat/seat.component";
import {ReservationDetailsComponent} from "./component/reservation-details/reservation-details.component";
import {ReservationPageComponent} from "./component/reservation-page/reservation-page.component";
import {NFC} from "@ionic-native/nfc/ngx";
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {NfcModalComponent} from "./modal/nfc-modal/nfc-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    MenuComponent,
    HomepageComponent,
    SeatComponent,
    ReservationDetailsComponent,
    ReservationPageComponent,
    NfcModalComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, HTTP, NFC, LocalNotifications],
  bootstrap: [AppComponent],
})
export class AppModule {}
