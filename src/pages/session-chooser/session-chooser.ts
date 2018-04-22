import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Block, BlockItem } from '../../app/schedule';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-session-chooser',
  templateUrl: 'session-chooser.html'
})
export class SessionChooserPage {
  public block : Block
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.block = navParams.get("block");
  }

  goToDetail(item : BlockItem) {
    this.navCtrl.push(DetailsPage, {block : this.block, item : item});
  }
  
}
