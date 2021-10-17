import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from "../../constants";
import {SeatService} from "../../service/seat/seat.service";
import {SeatsDTO} from "../../interface/SeatsDTO";
import {SeatState} from "../seat/seat.component";
import {ReservationService} from "../../service/reservation/reservation.service";
import {StorageService} from "../../service/storage/storage.service";
import {ReservationDTO} from "../../interface/ReservationDTO";
import {ToastService} from "../../service/toast/toast.service";
import {LoadingController} from "@ionic/angular";
import {AssetState} from "../../enum/AssetState";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  readonly toolbarPrefix = CONSTANTS.HOME_PAGE

  seats: SeatsDTO[]

  constructor(private seatService: SeatService,
              private toastService: ToastService,
              private loadingController: LoadingController,
              private reservationService: ReservationService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.presentLoading().then( (p) => {
      this.seatService.getSeatsState().subscribe(
        (items) => {
          this.seats = items
          p.dismiss()
        },
        (error) => {
          console.log(`an error occurred during getSeatsState ${error}`)
        }
      )
    })
  }

  selectedSeatHandler(seatState: SeatState): void {
    const loggedUser = this.storageService.get('username')
    const reservationDTO: ReservationDTO = {
      start: new Date().toISOString(),
      accountId: loggedUser,
      seatId: seatState.id
    }
    this.reservationService.createReservation(reservationDTO).subscribe(
      () => {
        console.log('Reservation successfully created')
        this.setSeatState(seatState.id, AssetState.OCCUPIED)
        this.onSuccess()
      },
      (error: Error) => {
        this.onError(error.message)
      }
    )
  }

  onSuccess(): void {
    this.toastService.presentToast("Reservation successfully created. Remember to check in, otherwise" +
      " the reservation will be automatically cancelled.", 5000).then(() => {
    })
  }

  onError(err: string): void {
    console.log(`sign up error ${JSON.stringify(err)}`)
    this.toastService.presentToast(err, 3000).then(() =>{
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2500
    });
    await loading.present();
    return loading
  }

  setSeatState(seatId: bigint, state: AssetState): void {
    this.seats.forEach((it) => {
      if ( it.id === seatId ) {
        it.state = state
      }
    })
  }
}
