import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SeatsDTO} from "../../interface/SeatsDTO";
import {CONSTANTS} from "../../constants";
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private httpClient: HttpClient,
              private storageService: StorageService) { }

  getSeatsState(): Observable<SeatsDTO[]> {
    const token = this.storageService.get("token")
    return this.performGetSeatState(token)
  }

  private performGetSeatState(token: string): Observable<SeatsDTO[]> {
    return this.httpClient.get<SeatsDTO[]>(CONSTANTS.URL.SEATS_STATE, { headers: {Authorization: `Bearer ${token}`}, responseType: 'json'})
  }
}
