import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../../interface/UserLogin";
import {CONSTANTS} from "../../constants";
import {StorageService} from "../storage/storage.service";
import {Router} from "@angular/router";
import {HTTP, HTTPResponse} from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _isLoggedIn = false;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private http: HTTP,
              private storageService: StorageService) { }

  login(userLogin: UserLogin): Promise<string> {
    console.log(`login user > ${userLogin.username}, ${userLogin.password}`)

    return this.performLogin(userLogin)
      .then(data => {
        const response = JSON.parse(data.data)
        this.storageService.set('token', response.token)
        this.storageService.set('username', response.username)
        this.storageService.set('accountType', response.accountType)
        this._isLoggedIn = true
        return 'SUCCESS'
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
        return error.error
      });
  }

  checkToken(token: string): Promise<true | false> {
    return this.performProfileInformation(token).then( response => {
      console.log(`Successful check-token with response > ${JSON.stringify(response)}`)
      this.storageService.set('token', response.data.token)
      this.storageService.set('username', response.data.username)
      this.storageService.set('accountType', response.data.accountType)
      this._isLoggedIn = true
      return true
      })
      .catch(error => {
        this._isLoggedIn = false;
        this.storageService.clear();
        return false
      });
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn
  }

  logout(): Promise<unknown> {
    this._isLoggedIn = false;
    this.storageService.clear()
    return this.router.navigate(['/login'])
  }

  private performLogin(userLogin: UserLogin): Promise<HTTPResponse> {
    this.http.setDataSerializer('json');
    return this.http.post(CONSTANTS.URL.LOGIN, {"username": userLogin.username, "password": userLogin.password}, {"Content-Type": "application/json"})
  }

  private performProfileInformation(token: string): Promise<HTTPResponse> {
    return this.http.get(CONSTANTS.URL.PROFILE, {}, {"Content-Type": "application/json", "Authorization": "Bearer " + token})
  }
}
