import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'ramda';
import { of, Subject } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

import { ProjectService } from '../../../core/services/project.service';
import { TodoService } from '../../../core/services/todo.service';
import { InputControl } from '../../../model/input-control';
import { PickerOption } from '../../../model/picker';
import { Project } from '../../../model/project';
import { Tab } from '../../../model/tab';
import { Todo, TodoStatus } from '../../../model/todo';
import { Unsub } from '../../../static/class/unsub';
import { MstLocalStorage } from '../../../model/storage';

@Component({
  selector: 'mst-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoDetailComponent extends Unsub implements OnInit {
  todo: Todo;
  project: Project;

  titleControl = new InputControl<string>({ required: true });
  statusControl = new InputControl<PickerOption>({ required: true });
  noteControl = new InputControl<string>();

  defaultExpectedTime: number;

  TodoStatus = TodoStatus;
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
  activeTab = MstLocalStorage.get('monster-projects-todo-detail-active-tab') || 'report';

  private shouldUpdate = new Subject<Todo>();
  private expectedTimeEvent = new Subject<number>();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService) {
      super();
    }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getTodo(id);
    this.updateTodo();
    this.listenToTitleChange();
    this.listenToStatusChange();
    this.listenToNoteChange();
    this.listenToExpectedTimeChange();
  }

  changeTab(newTabKey: string) {
    MstLocalStorage.set('monster-projects-todo-detail-active-tab', newTabKey);
    this.activeTab = newTabKey;
  }
  selectProject(project: Project) {
    this.todo = merge<Todo, Partial<Todo>>(this.todo, { projectId: project.id });
    this.shouldUpdate.next(this.todo);
  }
  updateUsedTime(time: number) {
    const usedTime = this.todo.usedTime || 0;
    this.todo = merge<Todo, Partial<Todo>>(this.todo, { usedTime: usedTime + time });
    this.shouldUpdate.next(this.todo);
  }
  pickHappenDate(date: number) {
    this.todo = merge<Todo, Partial<Todo>>(this.todo, { happenDate: date });
    this.shouldUpdate.next(this.todo);
  }
  expectedTimeChange(time: number) {
    this.expectedTimeEvent.next(time * 60);
  }
  toggleStatus() {
    const status = this.todo.status === TodoStatus.Doing ? TodoStatus.Done : TodoStatus.Doing;
    this.todo = merge<Todo, Partial<Todo>>(this.todo, { status });
    this.shouldUpdate.next(this.todo);
  }
  delete() {
    const sure = confirm('delete?');
    if (sure) {
      this.addSubscription(
        this.todoService.delete(this.todo.id).subscribe(success => {
          if (success) {
            this.router.navigate(['../../', this.project.id], {relativeTo: this.route});
          }
        })
      );
    }
  }

  private getTodo(todoId: number) {
    this.addSubscription(
      this.todoService.getById(todoId).pipe(
        switchMap(todo => {
          if (todo) {
            this.todo = todo;
            this.titleControl.setValue(this.todo.title);
            this.noteControl.setValue(this.todo.note);
            this.defaultExpectedTime = this.todo.expectedTime / 60;

            return this.projectService.getById(this.todo.projectId);
          } else {
            return of(null);
          }
        })
      ).subscribe(project => {
        if (project) {
          this.project = project;
        }
      })
    );
  }
  private updateTodo() {
    this.addSubscription(
      this.shouldUpdate.asObservable().pipe(
        switchMap(todo => {
          this.todo = merge<Todo, Partial<Todo>>(todo, { updatedAt: Date.now() });
          return this.todoService.update(this.todo)
        })
      ).subscribe(success => {
      })
    );
  }
  private listenToTitleChange() {
    this.addSubscription(
      this.titleControl.value$.pipe(debounceTime(500)).subscribe(title => {
        this.todo = merge<Todo, Partial<Todo>>(this.todo, { title });
        this.shouldUpdate.next(this.todo);
      })
    );
  }
  private listenToStatusChange() {
    this.addSubscription(
      this.statusControl.value$.pipe(filter(a => !!a)).subscribe(option => {
        const finishedAt = option.value === TodoStatus.Done ? Date.now() : undefined;
        this.todo = merge<Todo, Partial<Todo>>(this.todo, { status: <TodoStatus>option.value, finishedAt });
        this.shouldUpdate.next(this.todo);
      })
    );
  }
  private listenToNoteChange() {
    this.addSubscription(
      this.noteControl.value$.pipe(debounceTime(500)).subscribe(note => {
        this.todo = merge<Todo, Partial<Todo>>(this.todo, { note });
        this.shouldUpdate.next(this.todo);
      })
    );
  }
  
  private listenToExpectedTimeChange() {
    this.addSubscription(
      this.expectedTimeEvent.asObservable().pipe(debounceTime(500)).subscribe(expectedTime => {
        this.todo = merge<Todo, Partial<Todo>>(this.todo, { expectedTime });
        this.shouldUpdate.next(this.todo);
      })
    );
  }
}
