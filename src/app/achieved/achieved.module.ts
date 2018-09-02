import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../shared/button/button.module';
import { MonsterCommonModule } from '../shared/common/common.module';
import { InputModule } from '../shared/input/input.module';
import { AchievedCreateComponent } from './achieved-create/achieved-create.component';
import { AchievedRoutingModule } from './achieved-routing.module';
import { AchievedComponent } from './achieved/achieved.component';

@NgModule({
  imports: [
    CommonModule,
    AchievedRoutingModule,
    MonsterCommonModule,
    ButtonModule,
    InputModule
  ],
  declarations: [AchievedComponent, AchievedCreateComponent]
})
export class AchievedModule { }
