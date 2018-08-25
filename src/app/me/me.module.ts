import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MeRoutingModule } from './me-routing.module';
import { MeComponent } from './me/me.component';

@NgModule({
  imports: [
    CommonModule,
    MeRoutingModule
  ],
  declarations: [MeComponent]
})
export class MeModule { }
