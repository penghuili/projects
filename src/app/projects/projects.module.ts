import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../shared/button/button.module';
import { MonsterCommonModule } from '../shared/common/common.module';
import { DatepickerModule } from '../shared/datepicker/datepicker.module';
import { InputModule } from '../shared/input/input.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { ProgressModule } from '../shared/progress/progress.module';
import { WithinAppModule } from '../shared/within-app/within-app.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectItemComponent } from './projects/project-item/project-item.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ProgressModule,
    ButtonModule,
    InputModule,
    PipesModule,
    MonsterCommonModule,
    DatepickerModule,
    WithinAppModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectItemComponent,
    ProjectDetailComponent,
    ProjectCreateComponent,
  ]
})
export class ProjectsModule { }
