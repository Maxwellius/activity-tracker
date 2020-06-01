import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../models/Session';
import { ModalController } from '@ionic/angular';
import { DisplaySessionModalPage } from 'src/app/pages/display-session-modal/display-session-modal.page';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
})
export class SessionCardComponent implements OnInit {

  @Input() mySession: Session;
  detailedType: string;
  sessionDetailedDate: string;
  displayedMinutes: string;

  constructor(public modalController: ModalController) { 
  }

  async ngOnInit() {
    console.log(this.mySession);
    this.detailedType = (this.mySession.type === 'classique' ? 'Session classique' : 'Session etude');
    console.log(this.mySession.date);
    this.sessionDetailedDate = new Date(this.mySession.date).toLocaleDateString();
    if (this.mySession.duration.minutes < 10){
      this.displayedMinutes = this.mySession.duration.minutes.toString() + '0';
    } else {
      this.displayedMinutes = this.mySession.duration.minutes.toString();
    }
  }

  async showDetailModal() {
    const modal = await this.modalController.create({
      component: DisplaySessionModalPage,
      componentProps: {session: this.mySession}
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }
}