import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Duration from '../models/Duration';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-session-modal',
  templateUrl: './new-session-modal.page.html',
  styleUrls: ['./new-session-modal.page.scss'],
})
export class NewSessionModalPage implements OnInit {

  activityDuration: Duration;
  plusDisabled: boolean;
  minusDisabled: boolean;
  mainForm: FormGroup;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.mainForm = this.formBuilder.group({
      hours: ['0', Validators.compose([
          Validators.required,
          Validators.max(23),
          Validators.min(0)
      ])],
      minutes: ['0', Validators.compose([
        Validators.required,
        Validators.max(59),
        Validators.min(0)
      ])],
      nbPublications: ['0', Validators.compose([
        Validators.min(0)
      ])],
      nbVisites: ['0', Validators.compose([
        Validators.min(0)
      ])],
      comments: ['', Validators.compose([
      ])]
    });
  }

  ngOnInit() {
    this.activityDuration = new Duration(0, null);
    this.plusDisabled = false;
    this.minusDisabled = true;
  }

  enablePlusMinusButtons(){
    // tslint:disable-next-line: radix
    const currentValue = parseInt(this.mainForm.get('hours').value);
    this.minusDisabled = (currentValue <= 0);
    this.plusDisabled = (currentValue >= 23);
  }

  onIncrementHourButtonClick(){
    // tslint:disable-next-line: radix
    const currentValue = parseInt(this.mainForm.get('hours').value);
    this.mainForm.get('hours').setValue(currentValue + 1);
    this.enablePlusMinusButtons();
  }

  onDecrementHourButtonClick(){
    // tslint:disable-next-line: radix
    const currentValue = parseInt(this.mainForm.get('hours').value);
    this.mainForm.get('hours').setValue(currentValue - 1);
    this.enablePlusMinusButtons();
  }

  async dismissModal(){
    this.modalController.dismiss();
  }
}
