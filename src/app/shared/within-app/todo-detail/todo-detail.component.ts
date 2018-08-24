import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { InputControl } from '../../../model/input-control';
import { PickerOption } from '../../../model/picker';
import { Tab } from '../../../model/tab';
import { mapTodoStatusToText, Todo, TodoStatus } from '../../../model/todo';
import { merge } from 'ramda';

@Component({
  selector: 'mst-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoDetailComponent implements OnInit {
  todo: Todo;

  titleControl = new InputControl<string>({ required: true });
  statusControl = new InputControl<PickerOption>({ required: true });

  defaultKnowledge: number;

  statusOptions: PickerOption[] = [
    {
      value: TodoStatus.Doing,
      text: 'doing'
    },
    {
      value: TodoStatus.Done,
      text: 'done'
    }
  ];
  tabs: Tab[] = [
    {
      key: 'report',
      value: 'report'
    },
    {
      key: 'detail',
      value: 'detail'
    }
  ];
  activeTab = 'report';

  constructor() { }

  ngOnInit() {
    this.todo = {
      id: 1,
      title: 'todo 1',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      finishedAt: undefined,
      projectId: 1,
      note: 'note 1',
      happenDate: Date.now(),
      knowledge: 0.4,
      // in seconds
      expectedTime: 2000,
      // in seconds
      usedTime: 3000,
      status: TodoStatus.Doing
    };

    this.defaultKnowledge = this.todo.knowledge;
    const statusOption: PickerOption = { value: this.todo.status, text: mapTodoStatusToText(this.todo.status) };
    this.statusControl.setValue(statusOption);
    this.titleControl.setValue(this.todo.title);
  }

  changeTab(newTabKey: string) {
    this.activeTab = newTabKey;
  }
  updateKnowledge(knowledge: number) {
    this.todo = merge<Todo, Partial<Todo>>(this.todo, { knowledge });
  }
}
