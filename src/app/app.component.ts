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
    updateSchedule()
    .then(dk => this.rootPage = TabsControllerPage)
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

export function updateSchedule() : Promise<any> {
  return Promise.all([
    fetch('https://appapi.hackundsoehne.de/schedule')
    .then(response => response.json()),
    fetch('https://appapi.hackundsoehne.de/schedule')
    .then(response => response.json())
  ])
    .then(jsons => jsons.map(j => Schedule.fromJSON(j)))
    .then(schedules => {
      SCHEDULE = schedules[0]
      SCHEDULE_ALL = schedules[1]
      return schedules
    })
}


