import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SponsorsPage } from '../sponsors/sponsors';
import { NowPage } from '../now/now';
import { SchedulePage } from '../schedule/schedule';
import { HelpMePage } from '../help-me/help-me';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = NowPage;
  tab2Root: any = SchedulePage;
  tab3Root: any = SponsorsPage;
  tab4Root: any = HelpMePage;
  tab5Root: any = SettingsPage;
  constructor(public navCtrl: NavController) {
  }
  goToSponsors(params){
    if (!params) params = {};
    this.navCtrl.push(SponsorsPage);
  }
}
