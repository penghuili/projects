import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../core/services/project.service';
import { Project, ProjectStatus } from '../../model/project';
import { Unsub } from '../../static/class/unsub';
import { ROUTES } from '../../static/routes';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'mst-achieved',
  templateUrl: './achieved.component.html',
  styleUrls: ['./achieved.component.scss']
})
export class AchievedComponent extends Unsub implements OnInit {
  projects: Project[];

  ProjectStaus = ProjectStatus;

  private shouldLoad = new BehaviorSubject<boolean>(true);

  constructor(
    private projectService: ProjectService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.shouldLoad.asObservable().pipe(
        switchMap(() => this.projectService.getFinished())
      ).subscribe(projects => {
        this.projects = projects;
      })
    );
  }

  goToDetail(id: number) {
    this.router.navigateByUrl(`/${ROUTES.PROJECTS}/${id}`);
  }
  reload() {
    this.shouldLoad.next(true);
  }

}
