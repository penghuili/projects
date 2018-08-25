import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../static/routes';
import { MeComponent } from './me/me.component';

const routes: Routes = [
  {
    path: ROUTES.ME,
    component: MeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule { }
