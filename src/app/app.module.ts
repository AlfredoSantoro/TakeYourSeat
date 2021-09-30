import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {MenuComponent} from "./component/menu/menu.component";
import {HomeComponent} from "./component/home/home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    MenuComponent,
    HomeComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
