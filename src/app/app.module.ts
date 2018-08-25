import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AchievedModule } from './achieved/achieved.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule } from './calendar/calendar.module';
import { CoreModule } from './core/core.module';
import { MeModule } from './me/me.module';
import { ProjectsModule } from './projects/projects.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    
    ProjectsModule,
    CalendarModule,
    AchievedModule,
    MeModule,

    AppRoutingModule

    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
