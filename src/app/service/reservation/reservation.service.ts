import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReservationDTO} from "../../interface/ReservationDTO";
import {CONSTANTS} from "../../constants";
import {StorageService} from "../storage/storage.service";
import {HTTP, HTTPResponse} from "@ionic-native/http/ngx";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient,
              private http: HTTP,
              private storageService: StorageService) { }

  createReservation(reservationDTO: ReservationDTO): Promise<any> {
    console.log(`create new reservation for user #${reservationDTO.accountId}`)
    const token = this.storageService.get("token")
    return this.performReservation(reservationDTO, token)
  }

  getOngoingUserReservation(): Promise<any> {
    const token = this.storageService.get("token")
    return this.performGetOnGoingUserReservation(token)
  }

  private performGetOnGoingUserReservation(token: string): Promise<HTTPResponse> {
    return this.http.get(CONSTANTS.URL.RESERVATION_ON_GOING, {}, {"Content-Type": "application/json", "Authorization": `Bearer ${token}`})
  }

  private performReservation(reservation: ReservationDTO, token: string): Promise<HTTPResponse> {
    this.http.setDataSerializer('json');
    return this.http.post(CONSTANTS.URL.RESERVATION, {"start": reservation.start, "accountId": reservation.accountId, "seatId": reservation.seatId}, {"Content-Type": "application/json", "Authorization": `Bearer ${token}`})
  }
}
