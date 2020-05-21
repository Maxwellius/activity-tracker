import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Duration from '../models/Duration';

@Component({
  selector: 'app-new-session-modal',
  templateUrl: './new-session-modal.page.html',
  styleUrls: ['./new-session-modal.page.scss'],
})
export class NewSessionModalPage implements OnInit {

  activityDuration: Duration;
  plusDisabled: boolean;
  minusDisabled: boolean;

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.activityDuration = new Duration(0, null);
    this.plusDisabled = false;
    this.minusDisabled = true;
  }

  enablePlusMinusButtons(){
    if(this.activityDuration.hours === 23){
      this.plusDisabled = true;
      this.minusDisabled = false;
    } else if (this.activityDuration.hours === 0){
      this.plusDisabled = false;
      this.minusDisabled = true;
    } else {
      this.plusDisabled = false;
      this.minusDisabled = false;
    }
  }

  onIncrementHourButtonClick(){
    if(this.activityDuration.canIncrement()){
      this.activityDuration.incrementHours();
    }
    this.enablePlusMinusButtons();
  }

  onDecrementHourButtonClick(){
    if(this.activityDuration.canDecrement()){
      this.activityDuration.decrementHours();
    }
    this.enablePlusMinusButtons();
  }
  

  async dismissModal(){
    this.modalController.dismiss({
      'dismissed': true
    })
  }

  onDurationHoursChange(newHour) {
    if (Duration.checkValiditeByValue({hours:newHour, minutes: this.activityDuration.minutes})){
      this.activityDuration.hours = newHour;
    }
    this.enablePlusMinusButtons();
  }

  onDurationMinutesChange(newMinutes) {
    if(Duration.checkValiditeByValue({hours: this.activityDuration.hours, minutes: newMinutes})){
      this.activityDuration.minutes = newMinutes;
    }
  }


}
