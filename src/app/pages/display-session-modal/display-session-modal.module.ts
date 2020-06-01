import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplaySessionModalPageRoutingModule } from './display-session-modal-routing.module';

import { DisplaySessionModalPage } from './display-session-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplaySessionModalPageRoutingModule
  ],
  declarations: [DisplaySessionModalPage]
})
export class DisplaySessionModalPageModule {}
