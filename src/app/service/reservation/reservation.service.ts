import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReservationDTO} from "../../interface/ReservationDTO";
import {CONSTANTS} from "../../constants";
import {StorageService} from "../storage/storage.service";

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

  private performReservation(reservation: ReservationDTO, token: string): Observable<unknown> {
    return this.httpClient.post(CONSTANTS.URL.RESERVATION, reservation, { headers: {Authorization: `Bearer ${token}`}})
  }
}
