import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkComponent } from './link/link.component';
import { ParagraphsComponent } from './paragraphs/paragraphs.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LinkComponent,
    ParagraphsComponent,
  ],
  exports: [
    LinkComponent,
    ParagraphsComponent
  ]
})
export class MonsterCommonModule { }
