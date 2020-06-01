import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'display-session-modal',
    loadChildren: () => import('./pages/display-session-modal/display-session-modal.module').then( m => m.DisplaySessionModalPageModule)
  },
  {
    path: 'edit-session-modal',
    loadChildren: () => import('./pages/edit-session-modal/edit-session-modal.module').then( m => m.EditSessionModalPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
