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
        const reminder = new Date(new Date().getTime() + 600000)
        const checkInValidUntil = DateTime.now().plus(Duration.fromMillis(this.checkInFrequencyInMillisecond))
        this.onSuccess(checkInValidUntil.hour, checkInValidUntil.minute)
        this.scheduleCheckInReminder(reminder)
      }).catch(error => {
        this.onError(error)
        console.log(`an error occurred during check-in for reservation #${this.reservationOnGoing.reservationId}`, error)
      })
  }

  onSuccess(hour: number, minutes: number): void {
    this.toastService.presentToast(`Check in valid until ${hour}:${minutes}. You will receive a reminder notification 5 minutes before the check-in deadline`, 5000).then(() => {
    })
  }

  onError(err: any): void {
    console.log(`check-in error ${JSON.stringify(err)}`)
    this.toastService.presentToast('Error during check-in. Did you scan the correct nfc tag?', 4000).then(() =>{
    })
  }

  scheduleCheckInReminder(reminder: Date) {
    this.localNotifications.schedule({
      title: 'Check-in Reminder',
      text: 'Check in if you have not already done so, otherwise your seat will be available',
      trigger: {
        at: reminder
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
