import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Todo } from '../../model/todo';
import { DbService } from './db.service';
import { StartDateEndDate } from '../../model/time';

@Injectable()
export class TodoService {
  constructor(private db: DbService) { }

  getTodosByProjectId(id: number): Observable<Todo[]> {
    return from(
      this.db.getInstance().todos
      .where('projectId')
      .equals(id)
      .toArray()
    ).pipe(
      catchError(error => {
        alert(JSON.stringify(error));
        return of(null);
      })
    );
  }
  getAll(): Observable<Todo[]> {
    return from(
      this.db.getInstance().todos
      .toArray()
    ).pipe(
      catchError(error => {
        alert(JSON.stringify(error));
        return of(null);
      })
    );
  }
  getById(id: number): Observable<Todo> {
    return from(
      this.db.getInstance().todos
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
  getByDateRange(range: StartDateEndDate): Observable<Todo[]> {
    return from(
      this.db.getInstance().todos
      .where('happenDate')
      .between(range.start, range.end)
      .or('finishedAt')
      .between(range.start, range.end)
      .toArray()
    ).pipe(
      catchError(error => {
        alert(JSON.stringify(error));
        return of(null);
      })
    );
  }
  getFirstDate(): Observable<number> {
    return from(
      this.db.getInstance().todos.limit(1).first()
    ).pipe(
      map(todo => todo ? todo.createdAt : 0),
      catchError(error => {
        alert(JSON.stringify(error));
        return of(0);
      })
    );
  }

  create(todo: Todo): Observable<number> {
    return from(
      this.db.getInstance().todos.add(todo)
    ).pipe(
      catchError(error => {
        alert(JSON.stringify(error));
        return of(null);
      })
    );
  }
  update(todo: Todo): Observable<boolean> {
    return from(
      this.db.getInstance().todos.put(todo)
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
      this.db.getInstance().todos.delete(id)
    ).pipe(
      map(() => true),
      catchError(error => {
        alert(JSON.stringify(error));
        return of(false);
      })
    );
  }
}
