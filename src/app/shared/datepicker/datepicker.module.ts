import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { MonsterCommonModule } from '../common/common.module';
import { IconModule } from '../icon/icon.module';
import { PipesModule } from '../pipes/pipes.module';
import { DatepickerMonthRowComponent } from './datepicker/datepicker-month-row/datepicker-month-row.component';
import { DatepickerMonthComponent } from './datepicker/datepicker-month/datepicker-month.component';
import { DatepickerTitleComponent } from './datepicker/datepicker-title/datepicker-title.component';
import { DatepickerYearListComponent } from './datepicker/datepicker-year-list/datepicker-year-list.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { StartDateEndDatePickerComponent } from './start-date-end-date-picker/start-date-end-date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    MonsterCommonModule,
    PipesModule,
    ButtonModule
  ],
  declarations: [
    DatepickerComponent,
    DatepickerTitleComponent,
    DatepickerYearListComponent,
    DatepickerMonthComponent,
    DatepickerMonthRowComponent,
    StartDateEndDatePickerComponent
  ],
  exports: [
    DatepickerComponent,
    StartDateEndDatePickerComponent
  ]
})
export class DatepickerModule { }
