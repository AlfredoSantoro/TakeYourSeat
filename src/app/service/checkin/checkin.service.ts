import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CheckInDTO} from "../../interface/CheckInDTO";
import {CONSTANTS} from "../../constants";
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private httpClient: HttpClient,
              private storageService: StorageService) { }

  checkIn(checkInDTO: CheckInDTO): Observable<unknown> {
    console.log(`create new check-in for user #${checkInDTO.reservationId}`)
    const token = this.storageService.get("token")
    return this.performCheckIn(checkInDTO, token)
  }

  performCheckIn(checkInDTO: CheckInDTO, token: string): Observable<unknown> {
    return this.httpClient.post(CONSTANTS.URL.CHECK_IN, checkInDTO, { headers: {Authorization: `Bearer ${token}`}})
  }
}
