import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Host } from '../../app/schedule';

@Component({
  selector: 'page-speaker',
  templateUrl: 'speaker.html'
})
export class SpeakerPage {
  public host : Host
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.host = navParams.get("host");
  }
  
}
