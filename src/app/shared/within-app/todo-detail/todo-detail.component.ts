import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge } from 'ramda';
import { of, Subject } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

import { ProjectService } from '../../../core/services/project.service';
import { TodoService } from '../../../core/services/todo.service';
import { InputControl } from '../../../model/input-control';
import { PickerOption } from '../../../model/picker';
import { Project } from '../../../model/project';
import { Tab } from '../../../model/tab';
import { mapTodoStatusToText, Todo, TodoStatus, todoStatusOptions } from '../../../model/todo';
import { Unsub } from '../../../static/class/unsub';

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

  defaultKnowledge: number;
  defaultExpectedTime: number;

  statusOptions: PickerOption[] = todoStatusOptions;
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

  private shouldUpdate = new Subject<Todo>();
  private knowledgeEvent = new Subject<number>();
  private expectedTimeEvent = new Subject<number>();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
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
    this.listenToKnowledgeChange();
    this.listenToExpectedTimeChange();
  }

  changeTab(newTabKey: string) {
    this.activeTab = newTabKey;
  }
  selectProject(project: Project) {
    this.todo = merge<Todo, Partial<Todo>>(this.todo, { projectId: project.id });
    this.shouldUpdate.next(this.todo);
  }
  updateKnowledge(knowledge: number) {
    this.knowledgeEvent.next(knowledge);
  }
  updateUsedTime(time: number) {
    this.todo = merge<Todo, Partial<Todo>>(this.todo, { usedTime: this.todo.usedTime + time });
    this.shouldUpdate.next(this.todo);
  }
  pickHappenDate(date: number) {
    this.todo = merge<Todo, Partial<Todo>>(this.todo, { happenDate: date });
    this.shouldUpdate.next(this.todo);
  }
  expectedTimeChange(time: number) {
    this.expectedTimeEvent.next(time * 60);
  }

  private getTodo(todoId: number) {
    this.addSubscription(
      this.todoService.getById(todoId).pipe(
        switchMap(todo => {
          if (todo) {
            this.todo = todo;
            this.defaultKnowledge = this.todo.knowledge;
            this.defaultExpectedTime = this.todo.expectedTime / 60;
            const statusOption: PickerOption = this.statusOptions.find(a => a.value === this.todo.status);
            this.statusControl.setValue(statusOption);
            this.titleControl.setValue(this.todo.title);
            this.noteControl.setValue(this.todo.note);

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
  private listenToKnowledgeChange() {
    this.addSubscription(
      this.knowledgeEvent.asObservable().pipe(debounceTime(500)).subscribe(knowledge => {
        this.todo = merge<Todo, Partial<Todo>>(this.todo, { knowledge });
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
