import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Duration from '../models/Duration';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { Session } from '../models/Session';
import { Storage } from '@ionic/storage';

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
  imagePath: string;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private storage: Storage
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
      dateSession: ['0', Validators.required],
      nbPublications: ['0', Validators.compose([
        Validators.min(0)
      ])],
      nbVisites: ['0', Validators.compose([
        Validators.min(0)
      ])],
      comments: ['', Validators.compose([
      ])]
    });
    this.mainForm.get('dateSession').setValue(new Date().toISOString());
  }

  ngOnInit() {
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
    console.log(newValue.detail.value);
    console.log(this.mainForm.get('nbVisites').disabled);
  }

  async onSubmit(){
    // Crée et enregistre une nouvelle session.
    const sessionsList = await this.storage.get('sessionsList') as [Session];
    if (sessionsList === null){
      const newId = 1;
      const newDuration = new Duration(null, {hours: this.mainForm.value.hours as number, minutes: this.mainForm.value.minutes as number})
      const newSession = new Session(
        newId,
        this.mainForm.value.type as string,
        this.mainForm.value.nbPublications as number,
        this.mainForm.value.nbVisits as number,
        newDuration,
        this.mainForm.value.dateSession as string,
        this.mainForm.value.comments as string,
        this.imagePath
      );

      const newSessionList = [];
      newSessionList.push(newSession);
      await this.storage.set('sessionsList', newSessionList);
      console.log('etaitvide');
    } else {
      const newId = sessionsList[sessionsList.length - 1].id + 1;
      const newDuration = new Duration(null, {hours: this.mainForm.value.hours as number, minutes: this.mainForm.value.minutes as number});
      const newSession = new Session(
        newId,
        this.mainForm.value.type as string,
        this.mainForm.value.nbPublications as number,
        this.mainForm.value.nbVisits as number,
        newDuration,
        this.mainForm.value.dateSession as string,
        this.mainForm.value.comments as string,
        this.imagePath
      );
      sessionsList.push(newSession);
      console.log('currentList apres', sessionsList);
      await this.storage.set('sessionsList', sessionsList);
      console.log('etaitplein')
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
