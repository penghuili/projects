import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../static/routes';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: `${ROUTES.PROJECTS}/:id`,
    component: ProjectDetailComponent
  },
  {
    path: ROUTES.PROJECTS,
    component: ProjectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
