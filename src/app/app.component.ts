import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
// import { Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';



import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { Schedule } from './schedule';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;

  constructor() {
    fetch('https://appapi.hackundsoehne.de/schedule')
      .then(reponse => reponse.json())
      .then(json => Schedule.fromJSON(json))
      .then(schedule => {
        SCHEDULE = schedule
        this.rootPage = TabsControllerPage;
      })
      .catch(ex => {
        console.log('parsing failed', ex)
        //TODO error page!
        alert("critical error, unable to load schedule. Please reload page")
      })
  }


  // constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  //   platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     statusBar.styleDefault();
  //     splashScreen.hide();
  //   });
  // }
  
}

export var SCHEDULE = undefined
export var SCHEDULE_ALL = undefined

