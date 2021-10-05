import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {SeatService} from "../../service/seat/seat.service";
import {SeatsDTO} from "../../interface/SeatsDTO";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  readonly toolbarPrefix = CONSTANTS.HOME_PAGE

  seats: SeatsDTO[]

  constructor(private seatService: SeatService) { }

  ngOnInit(): void {
    this.seatService.getSeatsState().subscribe(
      (items) => {
        this.seats = items
      },
      (error) => {
        console.log(`an error occurred during getSeatsState ${error}`)
      }
    )
  }
}
