import { Component, OnInit } from '@angular/core';
import { Project, ProjectStatus } from '../../model/project';

@Component({
  selector: 'mst-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];

  constructor() { }

  ngOnInit() {
    this.projects = [
      {
        id: 1,
        title: 'project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        finishedAt: undefined,
        startDate: Date.now(),
        endDate: Date.now(),
        goal: 'goal 1',
        status: ProjectStatus.Active,
        progress: 0.4
      },
      {
        id: 2,
        title: 'project 2',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        finishedAt: undefined,
        startDate: Date.now(),
        endDate: Date.now(),
        goal: 'goal 2',
        status: ProjectStatus.Active,
        progress: 0.7
      }
    ];
  }

}
