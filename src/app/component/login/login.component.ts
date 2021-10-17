import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../service/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../../interface/UserLogin";
import {ToastService} from "../../service/toast/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formDataModel = new FormGroup( {
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }
  )

  readonly loginWelcome = CONSTANTS.LOGIN_WELCOME
  readonly toolbarPrefix = CONSTANTS.APP_TITLE

  username: string;
  password: string;
  hidden = true;

  successfulSignUpMessage = null

  constructor(
    private activatedRoute: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              private toastService: ToastService) { }

  login() {
    this.hidden = false;
    const userLogin : UserLogin = {
      username: this.formDataModel.get('username').value,
      password: this.formDataModel.get('password').value,
    }
    this.loginService.login(userLogin).subscribe(
      () => this.onSuccessLogin(),
      (error) => this.onErrorLogin(error)
    )
  }

  onSuccessLogin(): void {
    this.router.navigate(['']);
  }

  onErrorLogin(error: any): void {
    console.log(`login error ${JSON.stringify(error)}`)
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.successfulSignUpMessage = paramMap.get('successfulSignUpMessage')
      if ( this.successfulSignUpMessage !== undefined && this.successfulSignUpMessage !== null ) {
        this.toastService.presentToast(this.successfulSignUpMessage, 3000);
      }
    })
  }


}
