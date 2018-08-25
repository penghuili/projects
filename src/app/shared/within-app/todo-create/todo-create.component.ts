import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TodoService } from '../../../core/services/todo.service';
import { InputControl } from '../../../model/input-control';
import { Project } from '../../../model/project';
import { isWithin } from '../../../model/time';
import { Todo, TodoStatus } from '../../../model/todo';
import { Unsub } from '../../../static/class/unsub';

@Component({
  selector: 'mst-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent extends Unsub {
  @Input() set project(value: Project) {
    this._project = value;
    this.currentProject = value;
    this.setDatepickerWithProject(value);
  }
  get project() {
    return this._project;
  }
  @Input() useActionButton = true;
  @Input() plusColor = 'primary';
  @Output() created = new EventEmitter<boolean>();
  isShow = false;

  titleControl = new InputControl<string>({ required: true });
  noteControl = new InputControl<string>();
  happenDate = Date.now();
  expectedTime = 0;
  knowledge = 0;
  hasProjectError = false;

  datepickerDefaultDate = Date.now();
  datepickerStartDate = this.datepickerDefaultDate;
  datepickerEndDate: number;

  currentProject: Project;

  private _project: Project;
  constructor(private todoService: TodoService) {
    super();
  }

  open() {
    this.isShow = true;
  }
  selectProject(project: Project) {
    this.currentProject = project;
    this.setDatepickerWithProject(project);
  }
  pickHanppenDate(date: number) {
    this.happenDate = date;
  }
  expectedTimeChange(minates: number) {
    this.expectedTime = minates * 60;
  }
  knowledgeChange(knowledge: number) {
    this.knowledge = knowledge;
  }
  create() {
    if (this.titleControl.valid && this.currentProject) {
      this.hasProjectError = false;
      const timestamp = Date.now();
      const todo: Todo = {
        title: this.titleControl.getValue(),
        note: this.noteControl.getValue(),
        projectId: this.currentProject.id,
        status: TodoStatus.Doing,
        expectedTime: this.expectedTime,
        usedTime: 0,
        happenDate: this.happenDate,
        createdAt: timestamp,
        updatedAt: timestamp,
        finishedAt: undefined,
        knowledge: this.knowledge
      };

      this.addSubscription(
        this.todoService.create(todo).subscribe(id => {
          if (id) {
            this.isShow = false;
            this.created.emit(true);
            this.reset();
          }
        })
      );
    } else {
      this.hasProjectError = !this.project;
    }
  }
  cancel() {
    this.isShow = false;
    this.reset();
  }

  private setDatepickerWithProject(project: Project) {
    this.datepickerStartDate = project && project.startDate > this.datepickerStartDate ? project.startDate : this.datepickerStartDate;
    this.datepickerEndDate = project ? project.endDate : undefined;

    if (project && this.happenDate &&
      !isWithin(this.happenDate, project.startDate, project.endDate)) {
        this.happenDate = this.datepickerStartDate;
    }
  }
  private reset() {
    this.titleControl.reset();
    this.noteControl.reset();
    this.datepickerDefaultDate = Date.now();
    this.datepickerStartDate = this.datepickerDefaultDate;
    this.datepickerEndDate = undefined;
    this.expectedTime = 0;
    this.knowledge = 0;
    this.hasProjectError = false;
    this.currentProject = null;
  }
}
