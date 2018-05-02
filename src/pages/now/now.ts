import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('countdown') public countdown: String = "xx:xx"
  private timer;
  private runTimer : boolean =  true;
  private hasFinished = false
  private secondsRemaining = 0;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
    //TODO replace
    this.schedule = SCHEDULE
    this.setUpNextBlock()
    this.startTimer()
  }

  setUpNextBlock() {
    this.nextBlock = this.getNextMatchingBlock();
    if (this.nextBlock.items.length == 1) {
      this.title = this.nextBlock.items[0].name
    } else {
      this.title = this.nextBlock.name
    }
    var dif = this.nextBlock.start.valueOf() - Date.now().valueOf();
    this.secondsRemaining = dif / 1000;
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

  startTimer() {
      this.runTimer = true;
      this.hasFinished = false
      this.timerTick();
  }

  timerTick() {
    setTimeout(() => {
        if (!this.runTimer) { return; }
        this.secondsRemaining--;
        this.countdown = this.getSecondsAsDigitalClock(this.secondsRemaining);
        if (this.secondsRemaining > 0) {
            this.timerTick()
        }
        else {
            this.setUpNextBlock()
            this.timerTick();
        }
    }, 1000);
  }

  private getSecondsAsDigitalClock(inputSeconds: number) : string {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }


  public goToDetail() {
    if (this.nextBlock.items.length == 1) {
      this.navCtrl.push(DetailsPage, {block : this.nextBlock, item : this.nextBlock.items[0]});
    } else {
      this.navCtrl.push(SessionChooserPage, {block : this.nextBlock});
    }
  }
}
