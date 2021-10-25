import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./component/sign-up/sign-up.component";
import {LoginComponent} from "./component/login/login.component";
import {HomepageComponent} from "./component/homepage/homepage.component";
import {AuthGuard} from "./guard/auth.guard";
import {ReservationPageComponent} from "./component/reservation-page/reservation-page.component";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: 'homepage', component: HomepageComponent },
      { path: '', redirectTo: 'homepage', pathMatch: 'full'},
      { path: 'ongoing-reservation', component: ReservationPageComponent },
    ]
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:successfulSignUpMessage', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
