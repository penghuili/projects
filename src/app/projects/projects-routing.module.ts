import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoDetailComponent } from '../shared/within-app/todo-detail/todo-detail.component';
import { ROUTES } from '../static/routes';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: `${ROUTES.LIST}/${ROUTES.TODOS}/:id`,
    component: TodoDetailComponent
  },
  {
    path: `${ROUTES.LIST}/:id`,
    component: ProjectDetailComponent
  },
  {
    path: ROUTES.LIST,
    component: ProjectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
