import {AssetState} from "../enum/AssetState";

export interface ReservationOnGoing {
  reservationId: number,
  seatName: string,
  date: string,
  startTime: string,
  endTime: string,
  assetState: AssetState
}
