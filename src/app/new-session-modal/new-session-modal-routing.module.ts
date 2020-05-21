import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSessionModalPage } from './new-session-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewSessionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSessionModalPageRoutingModule {}
