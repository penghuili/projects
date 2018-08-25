import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../core/services/project.service';
import { Project, ProjectStatus } from '../../model/project';
import { Unsub } from '../../static/class/unsub';
import { Subject, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'mst-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends Unsub implements OnInit {
  activeProjects: Project[];
  inactiveProjects: Project[];

  private shouldLoad = new BehaviorSubject<boolean>(true);

  constructor(private projectService: ProjectService) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.shouldLoad.asObservable().pipe(
        switchMap(() => this.projectService.getInProgressProjects())
      ).subscribe(projects => {
        projects = projects || [];
        this.activeProjects = projects.filter(a => a.status === ProjectStatus.Active);
        this.inactiveProjects = projects.filter(a => a.status === ProjectStatus.Inactive);
      })
    );
  }

  reload() {
    this.shouldLoad.next(true);
  }

}
