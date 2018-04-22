import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { SessionChooserPage } from '../session-chooser/session-chooser';
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
  public time : String
  public backingBlock: schedule.Block
  public backingItem: schedule.BlockItem
  constructor(block : schedule.Block) {
    this.time = block.getTime()

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
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  scheduleGroups : Array<ScheduleGroup>;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
    this.scheduleGroups = schedule.SCHEDULE.days.map(x => new ScheduleGroup(x))
  }

  goToDetail(item : ScheduleItem) {
    if (item.backingItem) {
      this.navCtrl.push(DetailsPage, {block : item.backingBlock, item : item.backingItem});
    } else {
      this.navCtrl.push(SessionChooserPage, {block : item.backingBlock});
    }
  }
}
