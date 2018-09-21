import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from './static/routes';

const routes: Routes = [
  { path: '', redirectTo: ROUTES.LIST, pathMatch: 'full' },
  { path: '**', redirectTo: ROUTES.LIST }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
