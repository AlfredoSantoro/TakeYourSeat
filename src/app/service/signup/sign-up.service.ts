import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateAccount} from "../../interface/CreateAccount";
import {CONSTANTS} from "../../constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient: HttpClient) { }

  signUp(createAccount: CreateAccount): Observable<unknown> {
    console.log(`sign up user ${createAccount.username}`)
    return this.performSignUp(createAccount)
  }

  private performSignUp(createAccount: CreateAccount): Observable<unknown> {
    return this.httpClient.post(CONSTANTS.URL.SIGN_UP, createAccount)
  }
}
