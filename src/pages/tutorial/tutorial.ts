import { Component, ViewChild } from '@angular/core';

import { MenuController, NavController, Slides, LoadingController, Loading, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  @ViewChild('token') token : String  = ""
  showSkip = true;
  loading: Loading;

  @ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController
  ) { }

  startApp() {
    this.navCtrl.push(TabsControllerPage)
      .then(() => {
        this.storage.set('hasSeenTutorial', 'true')
      })
  }

  login() {
    this.showLoading()
    fetch("https://appapi.talkit.eu/schedule/" + this.token)
    .then(resp => {
      if (resp.status == 200) {
        return this.navCtrl.push(TabsControllerPage)
        .then(x => {
          this.storage.set('hasSeenTutorial', 'true')
        })
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

  onSlideChangeStart(slider: Slides) {
    
  }

  ionViewWillEnter() {
    this.slides.update();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
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