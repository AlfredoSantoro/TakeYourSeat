import {Component, Input, OnInit} from '@angular/core';
import {ReservationOnGoing} from "../../interface/ReservationOnGoing";
import {CheckinService} from "../../service/checkin/checkin.service";
import {ToastService} from "../../service/toast/toast.service";

@Component({
  selector: 'app-reservations-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {

  @Input() reservationOnGoing: ReservationOnGoing

  constructor(private checkInService: CheckinService,
              private toastService: ToastService) { }

  ngOnInit() {}

  checkIn(): void {
    const checkInDTO = {
      reservationId: this.reservationOnGoing.reservationId,
      nfcTagId: this.reservationOnGoing.seatTagNFC
    }
    this.checkInService.checkIn(checkInDTO).then(
      (res) => {
        this.onSuccess()
      }).catch(error => {
        this.onError(error)
        console.log(`an error occurred during check-in for reservation #${this.reservationOnGoing.reservationId}`, error)
      })
  }

  onSuccess(): void {
    this.toastService.presentToast("Check-in successfully", 2500).then(() => {
    })
  }

  onError(err: any): void {
    console.log(`check-in error ${JSON.stringify(err)}`)
    this.toastService.presentToast('Check in error ' + err.error, 4000).then(() =>{
    })
  }
}
