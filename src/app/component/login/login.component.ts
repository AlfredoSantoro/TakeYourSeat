import {Component} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {ActivatedRoute} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  readonly loginWelcome = CONSTANTS.LOGIN_WELCOME
  readonly toolbarPrefix = CONSTANTS.APP_TITLE

  successfulSignUpMessage = null

  constructor(private activatedRoute: ActivatedRoute,
              private toastController: ToastController) { }

  login() {

  }


  ionViewWillEnter() {
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
