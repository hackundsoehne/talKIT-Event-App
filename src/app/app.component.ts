import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
// import { Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';


import { Storage } from '@ionic/storage';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoginPage } from '../pages/login/login';
import { Schedule } from './schedule';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;

  constructor(public storage: Storage, private alertCtrl: AlertController) {
    this.setup()
    .catch(ex => {
      console.log('something failed', ex)

      console.log('something failed ' + ex.message == PERS_ERROR)
      if (ex.message == PERS_ERROR) {
        return this.showError("critical error, unable to load schedule. Loggig you out and trying to load general schedule.\n" +  ex)
        .then(() => storage.remove("user"))
        .then(() => this.setup())
      } else {
        //TODO error page!
        return this.showError("critical error, unable to load schedule. Please reload page.\n" +  ex)
      }
    })
  }

  setup() : Promise<any> {
    return updateSchedule(this.storage)
    .then(dk => Promise.all([
      this.storage.get('hasSeenTutorial').catch(() => "false"),
      this.storage.get('user').catch(() => "")
    ]))
    .then(comb => {
      const hasSeen = comb[0]
      const user = comb[1]
      if (hasSeen == "true" && user) {
        this.rootPage = TabsControllerPage
      } else if (hasSeen == "true") {
        // this.rootPage = LoginPage
        this.rootPage = TabsControllerPage
      } else {
        this.rootPage = TutorialPage
      }
      // this.rootPage = TutorialPage
    })
  }

  showError(text) : Promise<any> {
 
    let alert = this.alertCtrl.create({
      title: 'Fehler',
      subTitle: text,
      buttons: ['OK']
    });
    return alert.present();
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

export function logout(storage: Storage) : Promise<any> {
  return storage.remove("user")
  .then(() =>  SCHEDULE = SCHEDULE_ALL)
}

export function updateSchedule(storage: Storage) : Promise<any> {
  //TODO bypass cache option
  // var myHeaders = new Headers();
  // myHeaders.append('pragma', 'no-cache');
  // myHeaders.append('cache-control', 'no-cache');

  // var myInit = {
  //   method: 'GET',
  //   headers: myHeaders,
  // };
  return Promise.all([
    storage.get('user')
    .catch(x => "").
    then(id => {
      if (id && id != "") {
        return personal(id)
      } else {
        return fetch('https://appapi.talkit.eu/schedule')
      }
    })
      // .catch(x => {
      //   alert("critical error, unable to load schedule. Loggig you out.\n" + x)
      //   return fetch('https://appapi.talkit.eu/schedule')
      // })
    .then(response => response.json())
    ,
    fetch('https://appapi.talkit.eu/schedule')
    .then(response => response.json())
  ])
    .then(jsons => jsons.map(j => Schedule.fromJSON(j)))
    .then(schedules => {
      SCHEDULE = schedules[0]
      SCHEDULE_ALL = schedules[1]
      return schedules
    })
}

export const PERS_ERROR : string = "unable to retrieve personal schedule."

function personal(user: String) : Promise<Response> {
  return fetch('https://appapi.talkit.eu/schedule/' + user)
  .then(resp => {
    if (resp.status != 200) {
      var error = new Error(PERS_ERROR)
      throw error
    } else {
      return resp
    }
  })
}


