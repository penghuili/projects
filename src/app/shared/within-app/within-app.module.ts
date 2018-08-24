import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { MonsterCommonModule } from '../common/common.module';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { InputModule } from '../input/input.module';
import { PipesModule } from '../pipes/pipes.module';
import { ProgressModule } from '../progress/progress.module';
import { SliderModule } from '../slider/slider.module';
import { KnowledgeSliderComponent } from './todo-detail/knowledge-slider/knowledge-slider.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoTimerComponent } from './todo-detail/todo-timer/todo-timer.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputModule,
    MonsterCommonModule,
    PipesModule,
    SliderModule,
    ProgressModule,
    DatepickerModule
  ],
  declarations: [
    TodoItemComponent,
    TodoDetailComponent,
    KnowledgeSliderComponent,
    TodoTimerComponent
  ],
  exports: [
    TodoItemComponent,
    TodoDetailComponent
  ]
})
export class WithinAppModule { }
