import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  readonly toolbarPrefix = CONSTANTS.APP_TITLE

  constructor() { }

  ngOnInit() {}

}
