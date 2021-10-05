import {Component, Input} from '@angular/core';
import {AssetState} from "../../enum/AssetState";

@Component({
  selector: 'app-seat-image',
  templateUrl: './seat-image.component.html',
  styleUrls: ['./seat-image.component.scss'],
})
export class SeatImageComponent {

  @Input() assetState: AssetState

  constructor() { }

}
