import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateAccount} from "../../interface/CreateAccount";
import {CONSTANTS} from "../../constants";
import {HTTP, HTTPResponse} from "@ionic-native/http/ngx";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient: HttpClient,
              private http: HTTP) { }

  signUp(createAccount: CreateAccount): Promise<any> {
    console.log(`sign up user ${createAccount.username}`)
    return this.performSignUp(createAccount)
  }

  private performSignUp(createAccount: CreateAccount): Promise<HTTPResponse> {
    this.http.setDataSerializer('json');
    return this.http.post(CONSTANTS.URL.SIGN_UP, {"name": createAccount.name, "surname": createAccount.surname, "email": createAccount.email, "username": createAccount.username, "password": createAccount.password, "accountType": createAccount.accountType}, {"Content-Type": "application/json"})
  }
}
