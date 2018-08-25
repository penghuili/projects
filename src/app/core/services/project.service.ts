import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project } from '../../model/project';
import { MstLocalStorage } from '../../model/storage';

@Injectable()
export class ProjectService {
  constructor() {}

  getInProgressProjects(): Observable<Project[]> {
    const projects = MstLocalStorage.get('projects');
    return of(projects);
  }
  getById(id: number): Observable<Project> {
    const projects = MstLocalStorage.get('projects');
    return of(projects.find(a => a.id === id));
  }

  create(project: Project): Observable<number> {
    const projects = MstLocalStorage.get('projects');
    const id = project.createdAt;
    project.id = id;
    projects.push(project)
    MstLocalStorage.set('projects', projects);

    return of(id);
  }
  update(project: Project): Observable<boolean> {
    let projects: Project[] = MstLocalStorage.get('projects');
    projects = projects.map(a => a.id === project.id ? project : a);
    MstLocalStorage.set('projects', projects);
    return of(true);
  }
}
