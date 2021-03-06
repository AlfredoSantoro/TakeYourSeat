import {Component} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpService} from "../../service/signup/sign-up.service";
import {CreateAccount} from "../../interface/CreateAccount";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {

  readonly successfulSignUpMessage = "Successful sign up"

  formDataModel = new FormGroup( {
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }
  )

  readonly toolbarPrefix = CONSTANTS.APP_TITLE

  hidden = true;

  constructor(private signUpService: SignUpService,
              private navigateRoot: NavController) { }

  submit() {
    this.hidden = false;
    const createAccount : CreateAccount = {
      name: this.formDataModel.get('name').value,
      surname: this.formDataModel.get('surname').value,
      email: this.formDataModel.get('email').value,
      username: this.formDataModel.get('username').value,
      password: this.formDataModel.get('password').value,
      accountType: 'USER'
    }
    this.signUpService.signUp(createAccount)
      .then(
        () => this.onSuccess(),
        (error) => this.onError(error.error)
      );
  }

  onSuccess(): void {
    this.navigateRoot.navigateRoot(['/login', { successfulSignUpMessage: this.successfulSignUpMessage }])
  }

  onError(err: string): void {
    console.log(`sign up error ${JSON.stringify(err)}`)
  }
}
