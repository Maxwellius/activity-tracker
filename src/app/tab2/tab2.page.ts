import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewSessionModalPage } from '../new-session-modal/new-session-modal.page';
import { Session } from '../models/Session';
import { Storage } from '@ionic/storage';
import Duration from '../models/Duration';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  sessionsList: Session[];
  sessionsListFiltered: Session[];
  nbSessions: number;

  sumHours: string;
  sumMinutes: string;
  sumPublications: string;
  sumVisites: string;
  sumStudies: string;
  sumVideos: string;

  constructor(
    public modalController: ModalController,
    public storage: Storage,
    public emailComposer: EmailComposer
  ) {
  }

  async ngOnInit(){
    await this.refreshList();
  }

  async refreshList() {
    this.sumHours = '0';
    this.sumMinutes = '00';
    this.sumPublications = '0';
    this.sumVisites = '0';
    this.sumStudies = '0';
    this.sumVideos = '0';
    const tempSessionsList = await this.storage.get('sessionsList');
    if (tempSessionsList === null){
      this.sessionsList = [];
      this.nbSessions = 0;
      this.sessionsListFiltered = [];
    } else {
      this.sessionsList = tempSessionsList;
      this.sessionsListFiltered = this.filterSessionForThisMonth(this.sessionsList);
      this.nbSessions = this.sessionsListFiltered.length;
      console.log(this.sessionsList);
    }
    this.createResume(this.sessionsListFiltered);

  }

  filterSessionForThisMonth(list: Session[]): Session[]{

    return list.filter((session) => {
      const testDate = new Date(session.date);
      const dateActuelle = new Date();

      return (testDate.getMonth() === dateActuelle.getMonth() && testDate.getFullYear() === dateActuelle.getFullYear());

    });
  }

  createResume(list: Session[]){
    if (list.length > 0){
      const reducer = (accumulator, session) => accumulator + session.duration.hours;
      const resumeSession: Session = list.reduce(function(accumulateur, valeurCourante, index, array){
        // tslint:disable-next-line: no-bitwise
        // tslint:disable-next-line: max-line-length
        const newMinutes = valeurCourante.duration.hours * 60 + valeurCourante.duration.minutes + accumulateur.duration.hours * 60 + accumulateur.duration.minutes;
        console.log('newMinutes : ', newMinutes);

        const newDuration = new Duration(newMinutes, null);

        return new Session(
          valeurCourante.id,
          valeurCourante.type,
          (valeurCourante.nbPublications === undefined ? 0 : valeurCourante.nbPublications) + (accumulateur.nbPublications === undefined ? 0 : accumulateur.nbPublications),
          (valeurCourante.nbVisites === undefined ? 0 : valeurCourante.nbVisites) + (accumulateur.nbVisites === undefined ? 0 : accumulateur.nbVisites),
          (valeurCourante.nbVideos === undefined ? 0 : valeurCourante.nbVideos) + (accumulateur.nbVideos === undefined ? 0 : accumulateur.nbVideos),
          newDuration,
          valeurCourante.comments,
          valeurCourante.imagePath,
          valeurCourante.date
        );
      });

      this.sumHours = resumeSession.duration.hours.toString();
      this.sumMinutes = (resumeSession.duration.minutes < 10 ? resumeSession.duration.minutes.toString() + '0' : resumeSession.duration.minutes.toString());
      this.sumPublications = resumeSession.nbPublications.toString();
      this.sumVisites = resumeSession.nbVisites.toString();
      this.sumVideos = resumeSession.nbVideos.toString();

      this.sumStudies = list.filter(session => session.type === 'etude').length.toString();
    }
  }

  async onNewSessionButtonClick(){
    await this.openNewSessionModal();
  }

  async openNewSessionModal(){
    const modal = await this.modalController.create({
      component: NewSessionModalPage
    });
    modal.onDidDismiss().then((data) => {
      this.refreshList();
    });
    return await modal.present();
  }

  shareReport(){
    console.log('shareReport');
    const reportContent = `Durée totale d\'activité: ${this.sumHours} \nNombre de publications: ${this.sumPublications} \nNombre de visites: ${this.sumVisites} \nNombre de vidéos: ${this.sumVideos} \nNombre d\'études: ${this.sumStudies}`;
    this.emailComposer.open({subject: 'Mon résumé du mois', content: reportContent} as EmailComposerOptions);
  }
}
