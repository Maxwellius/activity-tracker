import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Session } from 'src/app/models/Session';
import { EditSessionModalPage } from '../edit-session-modal/edit-session-modal.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-display-session-modal',
  templateUrl: './display-session-modal.page.html',
  styleUrls: ['./display-session-modal.page.scss'],
})
export class DisplaySessionModalPage implements OnInit {

  session: Session;
  detailedType: string;
  sessionDetailedDate: string;
  displayedMinutes: string;

  constructor(
    public modalController: ModalController,
    public storage: Storage
  ) { }

  async ngOnInit() {
    await this.refreshPage();
  }
  async refreshPage(){
    const list = await this.storage.get('sessionsList') as Session[];
    const currentSession = list.find(lastSession => this.session.id === lastSession.id);

    this.session = currentSession;
    console.log('la session: ', this.session);
    this.detailedType = (this.session.type === 'classique' ? 'Session classique' : 'Session etude');
    this.sessionDetailedDate = new Date(this.session.date).toLocaleDateString();
    if (this.session.duration.minutes < 10){
      this.displayedMinutes = this.session.duration.minutes.toString() + '0';
    } else {
      this.displayedMinutes = this.session.duration.minutes.toString();
    }
  }

  async dismissModal(){
    this.modalController.dismiss();
  }

  async showEditSessionModal() {
    const modal = await this.modalController.create({
      component: EditSessionModalPage,
      componentProps: {previousSession: this.session}
    });
    modal.onDidDismiss().then((data) => {
      this.refreshPage();
    });
    return await modal.present();
  }
}
