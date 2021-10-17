import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AssetState} from "../../enum/AssetState";

export interface SeatState {
  state: AssetState,
  id: bigint
}

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss'],
})
export class SeatComponent {

  @Input() state: AssetState

  @Input() seatId: bigint

  @Output() selectedSeat = new EventEmitter<SeatState>();

  constructor() { }

  seatOnClick(): void {
    console.log('seat on click')
    if ( this.state === AssetState.FREE ) {
      this.selectedSeat.emit({state: this.state, id: this.seatId})
    }
  }
}
