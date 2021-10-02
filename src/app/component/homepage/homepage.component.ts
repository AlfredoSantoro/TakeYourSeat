import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  readonly toolbarPrefix = CONSTANTS.APP_TITLE + ' ' + CONSTANTS.HOME_PAGE

  constructor() { }

  ngOnInit() {}

}
