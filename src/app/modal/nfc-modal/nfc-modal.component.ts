import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {NFC} from '@ionic-native/nfc/ngx';
import {ToastService} from "../../service/toast/toast.service";

@Component({
  selector: 'app-nfc-modal',
  templateUrl: './nfc-modal.component.html',
  styleUrls: ['./nfc-modal.component.scss'],
})
export class NfcModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
              private toastService: ToastService,
              private nfc: NFC) { }

  ngOnInit() {
    this.activeNfcReader()
  }

  dismissModal() {
    this.nfc.close()
    this.modalCtrl.dismiss('no scanned')
  }

  dismissModalWithDate(tagNFCId: string) {
    this.nfc.close()
    this.modalCtrl.dismiss(tagNFCId)
  }

  activeNfcReader() {
    // READ NFC TAG ANDROID
    // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber
    const flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    const readerMode = this.nfc.readerMode(flags)
    this.toastService.presentToast(`NFC READER ACTIVATED`, 2000);
    readerMode.subscribe(
      (tag) => {
        this.dismissModalWithDate(this.nfc.bytesToHexString(tag.id))
      },
      (err) => {
        this.toastService.presentToast(`ERROR READING TAG: ${err}`, 3000);
      }
    )
  }
}
