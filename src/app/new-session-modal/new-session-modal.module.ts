import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSessionModalPage } from './new-session-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [NewSessionModalPage],
  entryComponents: [
    NewSessionModalPage
  ]
})
export class NewSessionModalPageModule {}
