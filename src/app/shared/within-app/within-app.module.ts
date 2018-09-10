import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { MonsterCommonModule } from '../common/common.module';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { IconModule } from '../icon/icon.module';
import { InputModule } from '../input/input.module';
import { PipesModule } from '../pipes/pipes.module';
import { ProgressModule } from '../progress/progress.module';
import { SliderModule } from '../slider/slider.module';
import { ClaritySliderComponent } from './clarity-slider/clarity-slider.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
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
    DatepickerModule,
    IconModule
  ],
  declarations: [
    TodoItemComponent,
    TodoDetailComponent,
    ClaritySliderComponent,
    TodoTimerComponent,
    TodoCreateComponent,
    ProjectListComponent,
    ProjectCreateComponent
  ],
  exports: [
    TodoItemComponent,
    TodoDetailComponent,
    TodoCreateComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ClaritySliderComponent
  ]
})
export class WithinAppModule { }
