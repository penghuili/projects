import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../static/routes';
import { AchievedComponent } from './achieved/achieved.component';

const routes: Routes = [
  {
    path: ROUTES.ACHIEVED,
    component: AchievedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchievedRoutingModule { }
