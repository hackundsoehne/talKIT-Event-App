import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { DetailsPicturePage } from '../details-picture/details-picture';
import { IntenseSessionsPage } from '../intense-sessions/intense-sessions';
import * as schedule from '../../app/schedule'

class ScheduleGroup {
  public name: String
  public scheduleItems : Array<ScheduleItem>

  constructor(day : schedule.DaySchedule) {
    var options = { weekday: 'long'};
    this.name = day.day.toLocaleDateString('de-DE', options)
    this.scheduleItems = day.blocks.map(x => new ScheduleItem(x))
  }
}

class ScheduleItem {
  public title : String
  public backingBlock: schedule.Block
  public backingItem: schedule.BlockItem
  constructor(block : schedule.Block) {
    if (block.items.length == 1) {
      let item = block.items[0]
      this.title = item.name
      this.backingBlock = block
      this.backingItem = item
    } else {
      this.title = block.name
      this.backingBlock = block
      this.backingItem = undefined
    }
  }
}


@Component({
  selector: 'page-program',
  templateUrl: 'program.html'
})
export class ProgramPage {
  scheduleGroups : Array<ScheduleGroup>;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
    this.scheduleGroups = schedule.SCHEDULE.days.map(x => new ScheduleGroup(x))
  }

  goToDetail(item : ScheduleItem) {
    this.goToIntenseSessions(undefined);
  }

  goToDetails(params){
    if (!params) params = {};
    this.navCtrl.push(DetailsPage);
  }
  goToDetailsPicture(params){
    if (!params) params = {};
    this.navCtrl.push(DetailsPicturePage);
  }
  goToIntenseSessions(params){
    if (!params) params = {};
    this.navCtrl.push(IntenseSessionsPage);
  }
}
