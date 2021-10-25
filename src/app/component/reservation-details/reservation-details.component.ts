import {Component, Input, OnInit} from '@angular/core';
import {ReservationOnGoing} from "../../interface/ReservationOnGoing";

@Component({
  selector: 'app-reservations-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {

  @Input() reservationOnGoing: ReservationOnGoing

  constructor() { }

  ngOnInit() {}

}
