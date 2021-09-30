import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  readonly loginWelcome = CONSTANTS.LOGIN_WELCOME
  readonly toolbarPrefix = CONSTANTS.APP_TITLE

  constructor() { }

  ngOnInit() {}

}
