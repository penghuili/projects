import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Project, ProjectStatus } from '../../model/project';
import { DbService } from './db.service';

@Injectable()
export class ProjectService {

  constructor(private db: DbService) {}

  getInProgress(): Observable<Project[]> {
    return from(
      this.db.getInstance().projects
      .filter(a => a.status === ProjectStatus.Active || a.status === ProjectStatus.Inactive)
      .reverse()
      .toArray()
    ).pipe(
      catchError(error => {
        alert(JSON.stringify(error));
        return of(null);
      })
    );
  }
  getFinished(): Observable<Project[]> {
    return from(
      this.db.getInstance().projects
      .filter(a => a.status === ProjectStatus.Done || a.status === ProjectStatus.WontDo)
      .sortBy('finishedAt')
    ).pipe(
      map(projects => projects ? projects.reverse() : projects),
      catchError(error => {
        alert(JSON.stringify(error));
        return of(null);
      })
    );
  }
  getById(id: number): Observable<Project> {
    return from(
      this.db.getInstance().projects
      .where('id')
      .equals(id)
      .first()
    ).pipe(
      catchError(error => {
        alert(JSON.stringify(error));
        return of(null);
      })
    );
  }

  create(project: Project): Observable<number> {
    return from(
      this.db.getInstance().projects.add(project)
    ).pipe(
      catchError(error => {
        alert(JSON.stringify(error));
        return of(null);
      })
    );
  }
  update(project: Project): Observable<boolean> {
    return from(
      this.db.getInstance().projects.put(project)
    ).pipe(
      map(() => true),
      catchError(error => {
        alert(JSON.stringify(error));
        return of(false);
      })
    );
  }
  delete(id: number): Observable<boolean> {
    return from(
      this.db.getInstance().projects.delete(id)
    ).pipe(
      map(() => true),
      catchError(error => {
        alert(JSON.stringify(error));
        return of(false);
      })
    );
  }
}
