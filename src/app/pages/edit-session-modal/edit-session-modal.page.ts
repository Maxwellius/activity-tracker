import { Component, OnInit } from '@angular/core';
import Duration from 'src/app/models/Duration';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Session } from 'src/app/models/Session';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-edit-session-modal',
  templateUrl: './edit-session-modal.page.html',
  styleUrls: ['./edit-session-modal.page.scss'],
})
export class EditSessionModalPage implements OnInit {

  previousSession: Session;

  activityDuration: Duration;
  plusDisabled: boolean;
  minusDisabled: boolean;
  mainForm: FormGroup;
  imagePath: string;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    console.log(this.previousSession);
    this.mainForm = this.formBuilder.group({
      hours: [this.previousSession.duration.hours, Validators.compose([
          Validators.required,
          Validators.max(23),
          Validators.min(0)
      ])],
      minutes: [this.previousSession.duration.minutes, Validators.compose([
        Validators.required,
        Validators.max(59),
        Validators.min(0)
      ])],
      dateSession: [this.previousSession.date, Validators.required],
      type: [this.previousSession.type, Validators.required],
      nbPublications: [this.previousSession.nbPublications, Validators.compose([
        Validators.min(0)
      ])],
      nbVisites: [this.previousSession.nbVisites, Validators.compose([
        Validators.min(0)
      ])],
      nbVideos: [this.previousSession.nbVideos, Validators.compose([
        Validators.min(0)
      ])],
      comments: [this.previousSession.comments, Validators.compose([
      ])]
    });
    this.activityDuration = new Duration(0, null);
    this.plusDisabled = false;
    this.minusDisabled = true;
  }

  enablePlusMinusButtons(): void{
    // tslint:disable-next-line: radix
    const currentValue = parseInt(this.mainForm.get('hours').value);
    this.minusDisabled = (currentValue <= 0);
    this.plusDisabled = (currentValue >= 23);
  }

  onIncrementHourButtonClick(): void{
    // tslint:disable-next-line: radix
    const currentValue = parseInt(this.mainForm.get('hours').value);
    this.mainForm.get('hours').setValue(currentValue + 1);
    this.enablePlusMinusButtons();
  }

  onDecrementHourButtonClick(): void{
    // tslint:disable-next-line: radix
    const currentValue = parseInt(this.mainForm.get('hours').value);
    this.mainForm.get('hours').setValue(currentValue - 1);
    this.enablePlusMinusButtons();
  }

  modeSegmentChanged(newValue: CustomEvent): void{
    if(newValue.detail.value === 'etude'){
      this.mainForm.get('nbVisites').disable();
    } else {
      this.mainForm.get('nbVisites').enable();
    }
    console.log(this.mainForm.get('type').value);
  }

  async onSubmit(){
    // Crée et enregistre une nouvelle session.
    const sessionsList = await this.storage.get('sessionsList') as [Session];
    if (sessionsList === null){
      console.log('Erreur modif session: La liste ne devrait pas être vide');
    } else {
      const newDuration = new Duration(null, {hours: this.mainForm.value.hours as number, minutes: this.mainForm.value.minutes as number});
      const newSession = new Session(
        this.previousSession.id,
        this.mainForm.value.type as string,
        this.mainForm.value.nbPublications as number,
        this.mainForm.value.nbVisites as number,
        this.mainForm.value.nbVideos as number,
        newDuration,
        this.mainForm.value.dateSession as string,
        this.mainForm.value.comments as string,
        this.imagePath
      );
      const indexFound = sessionsList.findIndex(session => session.id === this.previousSession.id)
      if(indexFound === undefined){
        console.error('Erreur, index non trouvé');
      } else {
        sessionsList[indexFound] = newSession;
      }
      await this.storage.set('sessionsList', sessionsList);
    }
    console.log('Resultat :', await this.storage.get('sessionsList'));
    this.dismissModal();
  }
  async onTakePictureButtonPush(){
    //Creating Options for camera module
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG
    };

    const tempImage = await this.camera.getPicture(options);
    const tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);
    const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);
    const newBaseFilesystemPath = this.file.dataDirectory;

    await this.file.copyFile(tempBaseFilesystemPath, tempFilename, newBaseFilesystemPath, tempFilename);
    const storedPhoto = newBaseFilesystemPath + tempFilename;
    this.imagePath = this.webview.convertFileSrc(storedPhoto);
  }

  async dismissModal(){
    this.modalController.dismiss();
  }

}
