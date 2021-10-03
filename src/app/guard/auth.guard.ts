import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from "../service/login/login.service";
import {StorageService} from "../service/storage/storage.service";
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private storageService: StorageService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    console.log('### Auth Guard in action...')
    const loggedIn = this.loginService.isLoggedIn()
    console.log(`logged in ${loggedIn}`)
    if ( loggedIn ) {
      return of(true)
    } else {
      const token = this.storageService.get("token")
      if ( token !== null && token !== undefined ) {
        return this.loginService.checkToken(token)
          .pipe(map( res => !!res ),
            tap( res => {
              if ( !!res ) {
                console.log('valid token')
              } else {
                console.log('invalid token redirect to login page')
                this.redirectToLogin();
              }
            })
          )
      } else { this.redirectToLogin(); return of(false) }
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
