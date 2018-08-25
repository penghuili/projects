import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IconModule } from '../icon/icon.module';
import { LinkComponent } from './link/link.component';
import { OverlayComponent } from './overlay/overlay.component';
import { ParagraphsComponent } from './paragraphs/paragraphs.component';
import { TabComponent } from './tab/tab.component';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconModule
  ],
  declarations: [
    LinkComponent,
    ParagraphsComponent,
    OverlayComponent,
    TabComponent,
    TimelineItemComponent
  ],
  exports: [
    LinkComponent,
    ParagraphsComponent,
    OverlayComponent,
    TabComponent,
    TimelineItemComponent
  ]
})
export class MonsterCommonModule { }
