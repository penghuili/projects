import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { MonsterCommonModule } from '../common/common.module';
import { InputComponent } from './input/input.component';
import { PickerComponent } from './picker/picker.component';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
  imports: [
    CommonModule,
    MonsterCommonModule,
    ButtonModule
  ],
  declarations: [
    InputComponent,
    SwitchComponent,
    PickerComponent
  ],
  exports: [
    InputComponent,
    SwitchComponent,
    PickerComponent
  ]
})
export class InputModule { }
