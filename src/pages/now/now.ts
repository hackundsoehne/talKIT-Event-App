import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Schedule, Block } from '../../app/schedule';
import { SCHEDULE } from '../../app/app.component';
import { DetailsPage } from '../details/details';
import { SessionChooserPage } from '../session-chooser/session-chooser';

@Component({
  selector: 'page-now',
  templateUrl: 'now.html'
})
export class NowPage {
  public schedule: Schedule
  public nextBlock: Block
  public title: String
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
    //TODO replace
    this.schedule = SCHEDULE
    this.nextBlock = this.getNextMatchingBlock();
    if (this.nextBlock.items.length == 1) {
      this.title = this.nextBlock.items[0].name
    } else {
      this.title = this.nextBlock.name
    }
  }
  
  getNextMatchingBlock() {
    var currentTime = new Date();
    for (let day of this.schedule.days) {
      for (let block of day.blocks) {
        if (block.start >= currentTime) {
          return block
        }
      }
    }
    let lastDay = this.schedule.days[this.schedule.days.length - 1]
    return lastDay.blocks[lastDay.blocks.length -1]
  }

  public goToDetail() {
    if (this.nextBlock.items.length == 1) {
      this.navCtrl.push(DetailsPage, {block : this.nextBlock, item : this.nextBlock.items[0]});
    } else {
      this.navCtrl.push(SessionChooserPage, {block : this.nextBlock});
    }
  }
}
