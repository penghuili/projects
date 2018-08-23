import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from './static/routes';

const routes: Routes = [
  { path: '', redirectTo: ROUTES.PROJECTS, pathMatch: 'full' },
  { path: '**', redirectTo: ROUTES.PROJECTS }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
