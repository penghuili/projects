import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkComponent } from './link/link.component';
import { OverlayComponent } from './overlay/overlay.component';
import { ParagraphsComponent } from './paragraphs/paragraphs.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LinkComponent,
    ParagraphsComponent,
    OverlayComponent
  ],
  exports: [
    LinkComponent,
    ParagraphsComponent,
    OverlayComponent
  ]
})
export class MonsterCommonModule { }
