import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { logout } from '../../app/app.component';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  @ViewChild('loginLabel') loginLabel : string  = "Getting ready"
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public storage: Storage) {
    storage.get('user')
    .then(tok => {
      if (tok) {
        this.loginLabel = "Logout"
      } else {
        this.loginLabel = "Login"
      }
    })
  }
  goToLogin(params){
    if (!params) params = {};
    logout(this.storage)
    .then(() => this.loginLabel = "Logout")
    .then(() => this.navCtrl.push(LoginPage))
  }
}
