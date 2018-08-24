import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
  ],
  exports: [
    ProjectStatusPipe,
    SecondFormatterPipe,
    MstDatePipe
  ]
})
export class PipesModule { }
