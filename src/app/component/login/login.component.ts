import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../service/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../../interface/UserLogin";
import {ToastService} from "../../service/toast/toast.service";
import {HTTP} from '@ionic-native/http/ngx'

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
  readonly version = CONSTANTS.VERSION

  username: string;
  password: string;
  hidden = true;

  successfulSignUpMessage = null

  constructor(
    private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HTTP,
              private loginService: LoginService,
              private toastService: ToastService) { }

  login() {
    this.hidden = false;
    const userLogin: UserLogin = {
      username: this.formDataModel.get('username').value,
      password: this.formDataModel.get('password').value,
    }
    this.loginService.login(userLogin).then((res) => {
      if ( res === 'SUCCESS' ) {
        this.onSuccessLogin()
      } else {
        this.onErrorLogin()
      }
    })
  }

  onSuccessLogin(): void {
    this.hidden = true
    this.toastService.presentToast(`login success`, 3000)
    this.router.navigate(['']);
  }

  onErrorLogin(): void {
    this.hidden = true;
    this.toastService.presentToast('Error during login. Verify your credentials and check your internet connection', 3000).then(() =>{
    })
  }

  ngOnInit() {
      this.activatedRoute.paramMap.subscribe(paramMap => {
      this.successfulSignUpMessage = paramMap.get('successfulSignUpMessage')
      if ( this.successfulSignUpMessage !== undefined && this.successfulSignUpMessage !== null ) {
        this.toastService.presentToast(this.successfulSignUpMessage, 3000);
      }
    })
  }

  testConnection() {
    console.log('rest API TEST')
    this.http.get(CONSTANTS.URL.TEST_RESOURCE, {}, {})
      .then(data => {
        console.log('success')
        this.toastService.presentToast(`The connection is alive`, 2000);
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {
        this.toastService.presentToast(`not alive connection error status: ${error.status}, error message: ${error.error}`, 3000);
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }
}
