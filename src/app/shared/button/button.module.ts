import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';
import { ActionButtonComponent } from './action-button/action-button.component';
import { CancelConfirmComponent } from './cancel-confirm/cancel-confirm.component';
import { GoBackComponent } from './go-back/go-back.component';
import { PageTopBottomButtonComponent } from './page-top-bottom-button/page-top-bottom-button.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
  ],
  declarations: [
    ActionButtonComponent,
    GoBackComponent,
    PageTopBottomButtonComponent,
    CancelConfirmComponent
  ],
  exports: [
    ActionButtonComponent,
    GoBackComponent,
    PageTopBottomButtonComponent,
    CancelConfirmComponent
  ]
})
export class ButtonModule { }
