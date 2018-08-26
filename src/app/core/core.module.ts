import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MonsterCommonModule } from '../shared/common/common.module';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DbService } from './services/db.service';
import { InputService } from './services/input.service';
import { LoadingService } from './services/loading.service';
import { NotificationService } from './services/notification.service';
import { ProjectService } from './services/project.service';
import { TodoService } from './services/todo.service';

@NgModule({
  imports: [
    CommonModule,
    MonsterCommonModule
  ],
  declarations: [
    LoadingComponent,
    NavigationComponent,
    AppHeaderComponent,
    NotificationComponent,
  ],
  exports: [
    LoadingComponent,
    NavigationComponent,
    AppHeaderComponent,
    NotificationComponent
  ],
  providers: [
    LoadingService,
    InputService,
    ProjectService,
    TodoService,
    DbService,
    NotificationService
  ]
})
export class CoreModule { }
