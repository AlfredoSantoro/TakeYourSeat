import {Component} from '@angular/core';
import {StorageService} from "../../service/storage/storage.service";
import {LoginService} from "../../service/login/login.service";
import {MenuController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent{

  menuTitle: string = ''

  public appPages = [
    { title: 'Home', url: '', icon: 'library' },
    { title: 'Ongoing Reservation', url: '/ongoing-reservation', icon: 'location' },
    { title: 'Profile', url: '', icon: 'person-circle' }
  ];

  constructor(private storageService: StorageService,
              private navigateRoot: NavController,
              private menuController: MenuController,
              private loginService: LoginService) { }

  ionDidOpen(): void {
    `Hello ${this.storageService.get('username')}`
  }

  menuItemOnClick(url: string): void {
    this.navigateRoot.navigateRoot([url])
    this.menuController.close()
  }

  logout(): void {
    this.menuController.close('sesalab-menu')
    this.loginService.logout()
    this.navigateRoot.navigateRoot(['/login', { successfulSignUpMessage: 'Successful log-out' }])
  }

}
