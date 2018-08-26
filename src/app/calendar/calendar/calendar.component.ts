import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../core/services/todo.service';
import { StartDateEndDate } from '../../model/time';
import { Unsub } from '../../static/class/unsub';
import { Todo, TodoStatus } from '../../model/todo';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends Unsub implements OnInit {
  undoneTodos: Todo[];
  doneTodos: Todo[];

  private shouldLoad = new Subject<StartDateEndDate>();

  constructor(private todoService: TodoService) {
    super();
  }

  ngOnInit() {
    this.loadTodos();
  }

  changeDateRange(range: StartDateEndDate) {
    this.shouldLoad.next(range);
  }

  private loadTodos() {
    this.addSubscription(
      this.shouldLoad.asObservable().pipe(
        switchMap(range => this.todoService.getByDateRange(range))
      ).subscribe(todos => {
        todos = todos || [];
        this.undoneTodos = todos.filter(a => a.status === TodoStatus.Doing);
        this.doneTodos = todos.filter(a => a.status === TodoStatus.Done);
      })
    );
  }
}
