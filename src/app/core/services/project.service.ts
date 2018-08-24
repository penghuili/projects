import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project, ProjectStatus } from '../../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  getActiveProjects(): Observable<Project[]> {
    return of([
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
    ]);
  }
}
