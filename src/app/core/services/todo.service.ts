import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../../model/todo';
import { MstLocalStorage } from '../../model/storage';

@Injectable()
export class TodoService {
  constructor() { }

  getTodosByProjectId(id: number): Observable<Todo[]> {
    const todos = MstLocalStorage.get('todos');
    return of(todos.filter(a => a.projectId === id));
  }

  create(todo: Todo): Observable<number> {
    const todos = MstLocalStorage.get('todos');
    const id = todo.createdAt;
    todo.id = id;
    todos.push(todo);
    MstLocalStorage.set('todos', todos);
    return of(id);
  }
}
