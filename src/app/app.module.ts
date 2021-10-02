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
import {DashboardComponent} from "./component/dashboard/dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    MenuComponent,
    DashboardComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
