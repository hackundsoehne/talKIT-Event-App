import { Component, ViewChild, ViewChildren } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { SessionChooserPage } from '../session-chooser/session-chooser';
import * as schedule from '../../app/schedule'
import {SCHEDULE, SCHEDULE_ALL, updateSchedule} from '../../app/app.component'
import { Storage } from '@ionic/storage';

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
    this.title = block.name
    if (block.items.length == 1) {
      let item = block.items[0]
      this.backingBlock = block
      this.backingItem = item
    } else {
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
  //@ViewChild('scheduleGroups') 
  scheduleGroups : Array<ScheduleGroup>
  segment = 'personal';
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public storage: Storage) {
    //TODO replace
    this.scheduleGroups = SCHEDULE.days.map(x => new ScheduleGroup(x))
  }

  updateDisplaySchedule() {
    if (this.segment == "all") {
      this.scheduleGroups = SCHEDULE_ALL.days.map(x => new ScheduleGroup(x))
    } else {
      this.scheduleGroups = SCHEDULE.days.map(x => new ScheduleGroup(x))
    }
  }

  goToDetail(item : ScheduleItem) {
    if (item.backingItem) {
      this.navCtrl.push(DetailsPage, {block : item.backingBlock, item : item.backingItem});
    } else {
      this.navCtrl.push(SessionChooserPage, {block : item.backingBlock});
    }
  }
  
  doRefresh(refresher: Refresher) {
    updateSchedule(this.storage)
    .then(() => {
      this.updateDisplaySchedule()
      refresher.complete();
    })
    .catch(ex => {
      alert("unable to update schedule" + ex)
    })
  }
}
