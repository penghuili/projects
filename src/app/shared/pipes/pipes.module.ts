import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectStatusPipe } from './project-status.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProjectStatusPipe,
  ],
  exports: [
    ProjectStatusPipe
  ]
})
export class PipesModule { }
