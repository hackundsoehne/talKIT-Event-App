import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { DetailsPicturePage } from '../details-picture/details-picture';
import { IntenseSessionsPage } from '../intense-sessions/intense-sessions';

@Component({
  selector: 'page-programm',
  templateUrl: 'programm.html'
})
export class ProgrammPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToDetails(params){
    if (!params) params = {};
    this.navCtrl.push(DetailsPage);
  }goToDetailsPicture(params){
    if (!params) params = {};
    this.navCtrl.push(DetailsPicturePage);
  }goToIntenseSessions(params){
    if (!params) params = {};
    this.navCtrl.push(IntenseSessionsPage);
  }
}
