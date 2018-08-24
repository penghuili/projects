import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DaysDiffPipe } from './days-diff.pipe';
import { MstDatePipe } from './mst-date.pipe';
import { ProjectStatusPipe } from './project-status.pipe';
import { SecondFormatterPipe } from './second-formatter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProjectStatusPipe,
    SecondFormatterPipe,
    MstDatePipe,
    DaysDiffPipe,
  ],
  exports: [
    ProjectStatusPipe,
    SecondFormatterPipe,
    MstDatePipe,
    DaysDiffPipe
  ]
})
export class PipesModule { }
