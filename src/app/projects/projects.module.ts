import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProgressModule } from '../shared/progress/progress.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectItemComponent } from './projects/project-item/project-item.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ProgressModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectItemComponent,
    ProjectDetailComponent
  ]
})
export class ProjectsModule { }
