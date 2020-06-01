import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplaySessionModalPage } from './display-session-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DisplaySessionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplaySessionModalPageRoutingModule {}
