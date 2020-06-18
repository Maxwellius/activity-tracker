import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { NewSessionModalPageModule } from '../new-session-modal/new-session-modal.module';
import { SessionCardComponent } from './session-card/session-card.component';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    NewSessionModalPageModule,
  ],
  providers: [EmailComposer],
  declarations: [Tab2Page, SessionCardComponent]
})
export class Tab2PageModule {}
