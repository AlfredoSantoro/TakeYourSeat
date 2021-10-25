import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {ReservationService} from "../../service/reservation/reservation.service";
import {ReservationOnGoing} from "../../interface/ReservationOnGoing";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss'],
})
export class ReservationPageComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }

  readonly toolbarPrefix = CONSTANTS.RESERVATION
  isOccupied: boolean = false
  onGoingReservation: ReservationOnGoing

  ngOnInit() {
    this.reservationService.getOngoingUserReservation().subscribe(
      (res) => {
        console.log(`ongoing reservation is --> ${JSON.stringify(res)}`)
        if ( res !== null )
        {
          this.onGoingReservation = res
          this.isOccupied = true
        }
      }, (e) => {
        console.log(`error during get ongoing user reservation --> ${e}`)
      })
  }
}
