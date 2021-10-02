import {Component} from '@angular/core';
import {StorageService} from "../../service/storage/storage.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent{

  menuTitle: string = ''

  public appPages = [
    { title: 'Home', url: '', icon: 'library' },
    { title: 'Reservations', url: '', icon: 'bookmark' },
    { title: 'Permissions', url: '', icon: 'accessibility' },
    { title: 'Profile', url: '', icon: 'person-circle' },
    { title: 'Logout', url: '', icon: 'log-out' },
  ];

  constructor(private storageService: StorageService) { }

  ionDidOpen(): void {
    this.storageService.get('username').then(r => {
      this.menuTitle = `Hello ${r}`;
    })
  }

}
