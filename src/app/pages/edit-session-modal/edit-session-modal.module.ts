import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSessionModalPageRoutingModule } from './edit-session-modal-routing.module';

import { EditSessionModalPage } from './edit-session-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSessionModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditSessionModalPage]
})
export class EditSessionModalPageModule {}
