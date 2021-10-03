import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../../interface/UserLogin";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ResponseUserLogin} from "../../interface/ResponseUserLogin";
import {CONSTANTS} from "../../constants";
import {StorageService} from "../storage/storage.service";
import {Router} from "@angular/router";
import {Profile} from "../../interface/Profile";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _isLoggedIn = false;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private storageService: StorageService) { }

  login(userLogin: UserLogin): Observable<ResponseUserLogin> {
    console.log(`login user > ${userLogin.username}, ${userLogin.password}`)
    return this.performLogin(userLogin).pipe(tap( (response: ResponseUserLogin) => {
      console.log(`Successful login with response > ${JSON.stringify(response)}`)
      this.storageService.set('token', response.token)
      this.storageService.set('username', response.username)
      this.storageService.set('accountType', response.accountType)
      this._isLoggedIn = true
    }))
  }

  checkToken(token: string): Observable<Profile> {
    return new Observable<Profile>( ob =>
      this.performProfileInformation(token).subscribe(
        (response: Profile) => {
          console.log(`Successful check-token with response > ${JSON.stringify(response)}`)
          this.storageService.set('token', token)
          this.storageService.set('username', response.username)
          this.storageService.set('accountType', response.accountType)
          this._isLoggedIn = true
          ob.next(response)
        }, () => {
          this._isLoggedIn = false;
          this.storageService.clear();
          ob.next(undefined);
        }))
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn
  }

  logout(): Promise<unknown> {
    this._isLoggedIn = false;
    this.storageService.clear()
    return this.router.navigate(['/login'])
  }

  private performLogin(userLogin: UserLogin): Observable<ResponseUserLogin> {
    return this.httpClient.post<ResponseUserLogin>(CONSTANTS.URL.LOGIN, userLogin)
  }

  private performProfileInformation(token: string): Observable<Profile> {
    return this.httpClient.get<Profile>(CONSTANTS.URL.PROFILE, { headers: {Authorization: `Bearer ${token}`}, responseType: 'json'})
  }
}
