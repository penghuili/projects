import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MonsterCommonModule } from '../shared/common/common.module';
import { AchievedRoutingModule } from './achieved-routing.module';
import { AchievedComponent } from './achieved/achieved.component';

@NgModule({
  imports: [
    CommonModule,
    AchievedRoutingModule,
    MonsterCommonModule
  ],
  declarations: [AchievedComponent]
})
export class AchievedModule { }
