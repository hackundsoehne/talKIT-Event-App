import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Block, BlockItem } from '../../app/schedule';
import { SpeakerPage } from '../speaker/speaker';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  public block : Block
  public item : BlockItem
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.block = navParams.get("block");
    this.item = navParams.get("item");
  }
  
  openMaps() {
    let lat = this.item.location.lat
    let long = this.item.location.long
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") != -1) || 
      (navigator.platform.indexOf("iPod") != -1) || 
      (navigator.platform.indexOf("iPad") != -1)) {
        window.open(`maps://maps.google.com/maps?daddr=${lat},${long}&amp;ll=`);
    }
    else /* else use Google */ {
      window.open(`https://maps.google.com/maps?daddr=${lat},${long}&amp;ll=`);
    }
  }

  openSpeaker() {
    this.navCtrl.push(SpeakerPage, {host : this.item.host});
  }
}
