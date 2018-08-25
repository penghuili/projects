import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Todo } from '../../model/todo';
import { DbService } from './db.service';

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
