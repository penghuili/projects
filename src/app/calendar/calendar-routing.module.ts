import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../static/routes';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: ROUTES.CALENDAR,
    component: CalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
