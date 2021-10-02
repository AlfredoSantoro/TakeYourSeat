import {Component} from '@angular/core';
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  public appPages = [
    { title: 'Home', url: '', icon: 'library' },
    { title: 'Reservations', url: '', icon: 'bookmark' },
    { title: 'Permissions', url: '', icon: 'accessibility' },
    { title: 'Profile', url: '', icon: 'person-circle' },
    { title: 'Logout', url: '', icon: 'log-out' },
  ];

  constructor(private menuController: MenuController) { }

}
