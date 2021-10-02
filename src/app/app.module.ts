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
import {MenuComponent} from "./component/menu/menu.component";
import {HomepageComponent} from "./component/homepage/homepage.component";
import {IonicStorageModule} from "@ionic/storage-angular";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    MenuComponent,
    HomepageComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
