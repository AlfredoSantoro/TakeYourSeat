import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReservationDTO} from "../../interface/ReservationDTO";
import {CONSTANTS} from "../../constants";
import {StorageService} from "../storage/storage.service";
import {ReservationOnGoing} from "../../interface/ReservationOnGoing";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient,
              private storageService: StorageService) { }

  createReservation(reservationDTO: ReservationDTO): Observable<unknown> {
    console.log(`create new reservation for user #${reservationDTO.accountId}`)
    const token = this.storageService.get("token")
    return this.performReservation(reservationDTO, token)
  }

  getOngoingUserReservation(): Observable<ReservationOnGoing> {
    const token = this.storageService.get("token")
    return this.performGetOnGoingUserReservation(token)
  }

  private performGetOnGoingUserReservation(token: string): Observable<ReservationOnGoing> {
    return this.httpClient.get<ReservationOnGoing>(CONSTANTS.URL.RESERVATION_ON_GOING, { headers: {Authorization: `Bearer ${token}`}})
  }

  private performReservation(reservation: ReservationDTO, token: string): Observable<unknown> {
    return this.httpClient.post(CONSTANTS.URL.RESERVATION, reservation, { headers: {Authorization: `Bearer ${token}`}})
  }
}
