import {Component} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpService} from "../../service/signup/sign-up.service";
import {CreateAccount} from "../../interface/CreateAccount";
import {Router} from "@angular/router";

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
              private router: Router) { }

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
      .subscribe(
        () => this.onSuccess(),
        (error) => this.onError(error)
      );
  }

  onSuccess(): void {
    this.router.navigate(['/home', { successfulSignUpMessage: this.successfulSignUpMessage }]);
  }

  onError(err: string): void {
    console.log(`sign up error ${err}`)
  }

  ionViewDidLeave(): void {
    console.log('ionViewDidLeave signup')
    this.formDataModel.reset();
    this.hidden = true;
  }
}
