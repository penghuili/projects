import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddComponent } from './add/add.component';
import { ArrowDownComponent } from './arrow-down/arrow-down.component';
import { ArrowLeftComponent } from './arrow-left/arrow-left.component';
import { ArrowRightComponent } from './arrow-right/arrow-right.component';
import { ArrowUpComponent } from './arrow-up/arrow-up.component';
import { CloseComponent } from './close/close.component';
import { DoneComponent } from './done/done.component';
import { LabelComponent } from './label/label.component';
import { PauseComponent } from './pause/pause.component';
import { PlayComponent } from './play/play.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CloseComponent,
    DoneComponent,
    ArrowLeftComponent,
    ArrowRightComponent,
    ArrowUpComponent,
    ArrowDownComponent,
    LabelComponent,
    AddComponent,
    PauseComponent,
    PlayComponent
  ],
  exports: [
    CloseComponent,
    DoneComponent,
    ArrowLeftComponent,
    ArrowRightComponent,
    ArrowUpComponent,
    ArrowDownComponent,
    LabelComponent,
    AddComponent,
    PauseComponent,
    PlayComponent
  ]
})
export class IconModule { }
