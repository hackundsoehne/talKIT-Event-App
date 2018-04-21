import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'sponsors',
  templateUrl: 'sponsors.html'
})
export class SponsorsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  
}