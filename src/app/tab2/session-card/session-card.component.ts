import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Session } from '../../models/Session';
import { ModalController, AlertController } from '@ionic/angular';
import { DisplaySessionModalPage } from 'src/app/pages/display-session-modal/display-session-modal.page';
import { Storage } from '@ionic/storage';
import Hammer from 'hammerjs';


@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
})
export class SessionCardComponent implements OnInit {

  @Input() mySession: Session;
  @Input() refreshList: ()=>any;
  detailedType: string;
  sessionDetailedDate: string;
  displayedMinutes: string;
  _hammer: any;

  constructor(
    public modalController: ModalController,
    public storage: Storage,
    public alertController: AlertController,
    private elementRef: ElementRef
  ) {}

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

    let element = this.elementRef.nativeElement;
    this._hammer = new Hammer.Manager(element, {
      recognizers: [
        [Hammer.Press],
        [Hammer.Tap],
      ],
    });

    this._hammer.on('press', () => this.onPress());
    this._hammer.on('tap', () => this.showDetailModal());

  }

  showDetailModal() {
    console.log(this);
    this.modalController.create({
      component: DisplaySessionModalPage,
      componentProps: {session: this.mySession}
    }).then((modal)=>{

      modal.onDidDismiss().then((data) => {
      });

      modal.present();
    });
  }

  onPress(){
    this.alertController.create({
      header: 'Confirmation',
      message: 'Confirmer la suppression de la session ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        }, {
          text: 'Okay',
          handler: () => {
             this.deleteSessionData();
          }
        }
      ]
    }).then(
      (alert) => {
        alert.present();
      }
    )
  }

  deleteSessionData(){
    this.storage.get('sessionsList').then(
      (list) => {
        const currentSession = list.findIndex(lastSession => this.mySession.id === lastSession.id)
        const newList = list.splice(currentSession, 1);
        this.storage.set('sessionsList', newList).then(
          () => {
            this.refreshList();
          }
        );
      }
    );
  }
}