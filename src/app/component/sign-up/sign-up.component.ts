import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpService} from "../../service/signup/sign-up.service";
import {CreateAccount} from "../../interface/CreateAccount";
import {ToastController} from "@ionic/angular";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  formDataModel = new FormGroup( {
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }
  )

  readonly toolbarPrefix = CONSTANTS.APP_TITLE

  pauseSpinner = true;
  hidden = false;

  constructor(private signUpService: SignUpService,
              private toastController: ToastController) { }

  ngOnInit() {}

  submit() {
    this.pauseSpinner = false;
    const createAccount : CreateAccount = {
      name: this.formDataModel.get('name').value,
      surname: this.formDataModel.get('surname').value,
      email: this.formDataModel.get('email').value,
      username: this.formDataModel.get('username').value,
      password: this.formDataModel.get('password').value,
      accountType: 'USER'
    }
    this.signUpService.signUp(createAccount)
      .pipe(finalize(() => { this.hidden = true }))
      .subscribe(
        () => this.onSuccess(),
        (error) => this.onError(error)
      );
  }

  onSuccess(): void {
    this.presentToast();
  }

  onError(err: string): void {
    console.log(`sign up error ${err}`)
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successful registration',
      duration: 1500
    });
    await toast.present();
  }
}
