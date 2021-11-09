import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CheckInDTO} from "../../interface/CheckInDTO";
import {CONSTANTS} from "../../constants";
import {StorageService} from "../storage/storage.service";
import {HTTP, HTTPResponse} from "@ionic-native/http/ngx";

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private httpClient: HttpClient,
              private http: HTTP,
              private storageService: StorageService) { }

  checkIn(checkInDTO: CheckInDTO): Promise<any> {
    console.log(`create new check-in for user #${checkInDTO.reservationId}`)
    const token = this.storageService.get("token")
    return this.performCheckIn(checkInDTO, token)
  }

  performCheckIn(checkInDTO: CheckInDTO, token: string): Promise<HTTPResponse> {
    this.http.setDataSerializer('json');
    return this.http.post(CONSTANTS.URL.CHECK_IN, {"reservationId": checkInDTO.reservationId, "nfcTagId": checkInDTO.nfcTagId},  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`})
  }
}
