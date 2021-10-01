import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../../interface/UserLogin";
import {Observable} from "rxjs";
import {ResponseUserLogin} from "../../interface/ResponseUserLogin";
import {CONSTANTS} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(userLogin: UserLogin): Observable<ResponseUserLogin> {
    console.log(`login user > ${userLogin.username}, ${userLogin.password}`)
    return this.performLogin(userLogin)
  }

  private performLogin(userLogin: UserLogin): Observable<ResponseUserLogin> {
    return this.httpClient.post<ResponseUserLogin>(CONSTANTS.URL.LOGIN, userLogin)
  }
}
