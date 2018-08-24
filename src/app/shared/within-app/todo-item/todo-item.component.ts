import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Todo, TodoStatus } from '../../../model/todo';
import { Router } from '@angular/router';
import { ROUTES } from '../../../static/routes';

@Component({
  selector: 'mst-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input() todo: Todo;
  TodoStatus = TodoStatus;

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigateByUrl(`/${ROUTES.PROJECTS}/${this.todo.projectId}/${this.todo.id}`);
  }
}
