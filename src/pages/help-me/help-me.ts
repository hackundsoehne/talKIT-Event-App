import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'help-me',
  templateUrl: 'help-me.html'
})
export class HelpMePage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  
}
