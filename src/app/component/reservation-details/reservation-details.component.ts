import {Component, Input, OnInit} from '@angular/core';
import {ReservationOnGoing} from "../../interface/ReservationOnGoing";
import {CheckinService} from "../../service/checkin/checkin.service";
import {ToastService} from "../../service/toast/toast.service";
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {ModalController} from "@ionic/angular";
import {NfcModalComponent} from "../../modal/nfc-modal/nfc-modal.component";
import {DateTime, Duration} from "luxon";
import {CheckInDTO} from "../../interface/CheckInDTO";

@Component({
  selector: 'app-reservations-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {

  @Input() reservationOnGoing: ReservationOnGoing

  reservationDateFormatted: string = ''
  reservationStartTimeFormatted: string = ''
  reservationEndTimeFormatted: string = ''

  // 15 minutes
  readonly checkInFrequencyInMillisecond = 900000
  // 5 minutes
  readonly checkInReminder = 300000

  constructor(private checkInService: CheckinService,
              private modalCtrl: ModalController,
              private localNotifications: LocalNotifications,
              private toastService: ToastService) { }

  ngOnInit() {
    const startDate = DateTime.fromISO(this.reservationOnGoing.start)
    const endDate = DateTime.fromISO(this.reservationOnGoing.end)
    this.reservationDateFormatted = `${startDate.day}-${startDate.month}-${startDate.year}`
    this.reservationStartTimeFormatted = `${startDate.hour}-${startDate.minute}`
    this.reservationEndTimeFormatted = `${endDate.hour}-${endDate.minute}`
  }

  checkIn(checkInDTO: CheckInDTO): void {
    this.checkInService.checkIn(checkInDTO).then(
      (res) => {
        const checkInValidUntil = DateTime.now().plus(Duration.fromMillis(this.checkInFrequencyInMillisecond))
        const notificationDate = checkInValidUntil.minus(Duration.fromMillis(this.checkInReminder))
        this.onSuccess(checkInValidUntil.hour, checkInValidUntil.minute, notificationDate.hour,notificationDate.minute)
        this.scheduleCheckInReminder(notificationDate)
      }).catch(error => {
        this.onError(error)
        console.log(`an error occurred during check-in for reservation #${this.reservationOnGoing.reservationId}`, error)
      })
  }

  onSuccess(hour: number, minutes: number, notificationHour: number, notificationMinutes: number): void {
    this.toastService.presentToast(`Check in valid until ${hour}:${minutes}. You will receive a reminder notification at ${notificationHour}:${notificationMinutes}`, 2500).then(() => {
    })
  }

  onError(err: any): void {
    console.log(`check-in error ${JSON.stringify(err)}`)
    this.toastService.presentToast('Check in error ' + err.error, 4000).then(() =>{
    })
  }

  scheduleCheckInReminder(at: DateTime) {
    this.localNotifications.schedule({
      title: 'Check-in Reminder',
      text: 'Check in if you have not already done so, otherwise your seat will be available',
      trigger: {
        at: new Date(at.year, at.month, at.day, at.hour, at.minute, at.second, at.millisecond)
      }
    })
  }

  async openNfcModal() {
    const nfcModal = await this.modalCtrl.create({
      component: NfcModalComponent
    });
    nfcModal.onDidDismiss<string>().then(data => {
      if ( data.data === 'no scanned' || data.data === undefined ) {
        this.toastService.presentToast('No NFC tag scanned', 3000)
      } else {
        this.checkIn({reservationId: this.reservationOnGoing.reservationId, nfcTagId: data.data})
      }
    });
    return await nfcModal.present();
  }
}
