import { Component, ViewChild } from '@angular/core';
import { NavController, Loading, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('token') token : String  = ""
  loading: Loading;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController
  ) { }

  login() {
    this.showLoading()
    fetch("https://appapi.talkit.eu/schedule/" + this.token)
    .then(resp => {
      if (resp.status == 200) {
        return this.navCtrl.push(TabsControllerPage)
        .then(() => {
          this.storage.set('user', this.token)
        })
      } else {
        var error = new Error(resp.statusText)
        return Promise.reject(error)
      }
    })
    .catch(x => {
      this.showError("Token nicht gefunden")
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fehler',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
