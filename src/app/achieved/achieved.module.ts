import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AchievedRoutingModule } from './achieved-routing.module';
import { AchievedComponent } from './achieved/achieved.component';

@NgModule({
  imports: [
    CommonModule,
    AchievedRoutingModule
  ],
  declarations: [AchievedComponent]
})
export class AchievedModule { }
