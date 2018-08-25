import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule
  ],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
