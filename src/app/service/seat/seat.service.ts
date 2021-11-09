import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CONSTANTS} from "../../constants";
import {StorageService} from "../storage/storage.service";
import {HTTP, HTTPResponse} from "@ionic-native/http/ngx";


@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private httpClient: HttpClient,
              private http: HTTP,
              private storageService: StorageService) { }

  getSeatsState(): Promise<HTTPResponse> {
    const token = this.storageService.get("token")
    return this.performGetSeatState(token)
  }

  private performGetSeatState(token: string): Promise<HTTPResponse> {
    return this.http.get(CONSTANTS.URL.SEATS_STATE, {}, {"Content-Type": "application/json", "Authorization": `Bearer ${token}`})
  }
}
