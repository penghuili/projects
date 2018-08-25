import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../core/services/project.service';
import { Unsub } from '../../static/class/unsub';
import { Project, ProjectStatus } from '../../model/project';

@Component({
  selector: 'mst-achieved',
  templateUrl: './achieved.component.html',
  styleUrls: ['./achieved.component.scss']
})
export class AchievedComponent extends Unsub implements OnInit {
  projects: Project[];

  ProjectStaus = ProjectStatus;

  constructor(private projectService: ProjectService) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.projectService.getFinished().subscribe(projects => {
        this.projects = projects;
      })
    );
  }

}
