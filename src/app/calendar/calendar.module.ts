import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatepickerModule } from '../shared/datepicker/datepicker.module';
import { IconModule } from '../shared/icon/icon.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { WithinAppModule } from '../shared/within-app/within-app.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    PipesModule,
    IconModule,
    DatepickerModule,
    WithinAppModule
  ],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
