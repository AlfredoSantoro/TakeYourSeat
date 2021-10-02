import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {LoginService} from "../../service/login/login.service";
import {ResponseUserLogin} from "../../interface/ResponseUserLogin";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../../interface/UserLogin";
import {StorageService} from "../../service/storage/storage.service";

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

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              private toastController: ToastController) { }

  login() {
    this.hidden = false;
    const userLogin : UserLogin = {
      username: this.formDataModel.get('username').value,
      password: this.formDataModel.get('password').value,
    }
    this.loginService.login(userLogin).subscribe(
      (response) => this.onSuccessLogin(response),
      (error) => this.onErrorLogin(error)
    )
  }

  onSuccessLogin(response: ResponseUserLogin): void {
    this.storageService.set('token', response.token)
    this.storageService.set('username', response.username)
    this.storageService.set('accountType', response.accountType)
    this.storageService.get('token').then(function (value: any) {
      console.log(`token value is -> ${value}`)
    })
    console.log(`Successful login with response > ${JSON.stringify(response)}`)
    this.router.navigate(['/homepage']);
  }

  onErrorLogin(error: any): void {
    console.log(`login error ${JSON.stringify(error)}`)
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.successfulSignUpMessage = paramMap.get('successfulSignUpMessage')
      console.log(this.successfulSignUpMessage)
      if ( this.successfulSignUpMessage !== undefined && this.successfulSignUpMessage !== null ) {
        this.presentToast();
      }
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successful registration',
      duration: 2000
    });
    await toast.present();
  }

}
