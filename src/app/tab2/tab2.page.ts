import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewSessionModalPage } from '../new-session-modal/new-session-modal.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public modalController: ModalController
  ) {}

  async onNewSessionButtonClick(){
    await this.openNewSessionModal();
  }

  async openNewSessionModal(){
    const modal = await this.modalController.create({
      component: NewSessionModalPage
    });
    return await modal.present();
  }
}
