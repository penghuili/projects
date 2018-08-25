import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DaysDiffPipe } from './days-diff.pipe';
import { MstDatePipe } from './mst-date.pipe';
import { ProjectStatusPipe } from './project-status.pipe';
import { SecondFormatterPipe } from './second-formatter.pipe';
import { TodoStatusPipe } from './todo-status.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProjectStatusPipe,
    SecondFormatterPipe,
    MstDatePipe,
    DaysDiffPipe,
    TodoStatusPipe,
  ],
  exports: [
    ProjectStatusPipe,
    SecondFormatterPipe,
    MstDatePipe,
    DaysDiffPipe,
    TodoStatusPipe
  ]
})
export class PipesModule { }
