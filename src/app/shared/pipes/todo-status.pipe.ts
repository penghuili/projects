import { Pipe, PipeTransform } from '@angular/core';

import { mapTodoStatusToText, TodoStatus } from '../../model/todo';

@Pipe({
  name: 'todoStatus'
})
export class TodoStatusPipe implements PipeTransform {

  transform(value: TodoStatus): string {
    return mapTodoStatusToText(value);
  }

}
