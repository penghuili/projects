import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MonsterCommonModule } from '../shared/common/common.module';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { InputService } from './services/input.service';
import { LoadingService } from './services/loading.service';
import { ProjectService } from './services/project.service';

@NgModule({
  imports: [
    CommonModule,
    MonsterCommonModule
  ],
  declarations: [
    LoadingComponent,
    NavigationComponent,
    AppHeaderComponent,
  ],
  exports: [
    LoadingComponent,
    NavigationComponent,
    AppHeaderComponent
  ],
  providers: [
    LoadingService,
    InputService,
    ProjectService
  ]
})
export class CoreModule { }
