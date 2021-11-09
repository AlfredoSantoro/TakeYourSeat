import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../service/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../../interface/UserLogin";
import {ToastService} from "../../service/toast/toast.service";
import {HTTP} from '@ionic-native/http/ngx'
import {NFC} from '@ionic-native/nfc/ngx';


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
              private http: HTTP,
              private nfc: NFC,
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
        this.onErrorLogin("Login error: try again")
      }
    })
  }

  onSuccessLogin(): void {
    this.hidden = true
    this.toastService.presentToast(`login success`, 3000)
    this.router.navigate(['']);
  }

  onErrorLogin(error: any): void {
    this.hidden = true;
    console.log(`login error ${JSON.stringify(error)}`)
    this.toastService.presentToast(`login error -> ${JSON.stringify(error)}`, 3000).then(() =>{
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
        this.toastService.presentToast(`The connection is alive`, 5000);
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {
        this.toastService.presentToast(`not alive connection error status: ${error.status}, error message: ${error.error}`, 5000);
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }

  testNFCTag() {
    // READ NFC TAG ANDROID
    // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber
    const flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    const readerMode = this.nfc.readerMode(flags)
    this.toastService.presentToast(`NFC READER MODE ACTIVATED`, 2000);
    readerMode.subscribe(
      (tag) => {
        this.toastService.presentToast(`NFC TAG SCANNED SUCCESSFULLY`, 3000);
      },
      (err) => {
        this.toastService.presentToast(`ERROR READING TAG: ${err}`, 3000);
      }
    )
  }
}
