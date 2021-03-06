import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { merge } from 'ramda';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

import { ProjectService } from '../../core/services/project.service';
import { TodoService } from '../../core/services/todo.service';
import { InputControl } from '../../model/input-control';
import { PickerOption } from '../../model/picker';
import { Project, ProjectStatus, projectStatusOptions } from '../../model/project';
import { Tab } from '../../model/tab';
import { Todo, TodoStatus } from '../../model/todo';
import { Unsub } from '../../static/class/unsub';
import { MstLocalStorage } from '../../model/storage';

@Component({
  selector: 'mst-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent extends Unsub implements OnInit {
  project: Project;
  todos: Todo[];
  undoneTodos: Todo[];
  doneTodos: Todo[];
  titleControl = new InputControl<string>({ required: true });
  goalControl = new InputControl<string>({ required: true });
  status: PickerOption;
  startDate: number;
  endDate: number;
  startOfEndDate: number;
  totalDays = 0;
  usedDays = 0;
  usedTime = 0;
  showStatusError = false;
  canAddTodo = true;

  defaultClarity: number;

  statusOptions = projectStatusOptions;
  tabs: Tab[] = [
    {
      key: 'note',
      value: 'note'
    },
    {
      key: 'report',
      value: 'report'
    },
    {
      key: 'detail',
      value: 'detail'
    },
    {
      key: 'chart',
      value: 'chart'
    }
  ];
  activeTab = MstLocalStorage.get('monster-projects-project-detail-active-tab') || 'note';

  private shouldUpdateProject = new Subject<Project>();
  private shouldLoadTodos = new BehaviorSubject<boolean>(true);
  private clarityEvent = new Subject<number>();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService) {
      super();
    }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProject(id);
    this.getTodos(id);
    this.updateProject();
    this.listenToTitleChange();
    this.listenToClarityChange();
    this.listenToGoalChange();
  }

  changeTab(newTabKey: string) {
    MstLocalStorage.set('monster-projects-project-detail-active-tab', newTabKey);
    this.activeTab = newTabKey;
  }
  updateClarity(clarity: number) {
    this.clarityEvent.next(clarity);
  }
  pickStartDate(date: number) {
    this.startDate = date;
    this.startOfEndDate = addDays(this.startDate, 1).getTime();
    if (this.startDate > this.endDate) {
      this.endDate = addDays(this.startDate, 1).getTime();
    }
    this.project = merge<Project, Partial<Project>>(this.project, { startDate: this.startDate, endDate: this.endDate });
    this.calcDays(this.project);
    this.shouldUpdateProject.next(this.project);
  }
  pickEndDate(date: number) {
    this.endDate = date;
    this.project = merge<Project, Partial<Project>>(this.project, { endDate: this.endDate });
    this.calcDays(this.project);
    this.shouldUpdateProject.next(this.project);
  }
  selectStatus(option: PickerOption) {
    if ((option.value === ProjectStatus.Done || option.value === ProjectStatus.WontDo) && this.undoneTodos && this.undoneTodos.length > 0) {
      this.showStatusError = true;
      this.status = this.statusOptions.find(a => a.value === this.project.status);
    } else {
      this.showStatusError = false;
      const finishedAt = option.value === ProjectStatus.WontDo || option.value === ProjectStatus.Done ? Date.now() : undefined;
      this.project = merge<Project, Partial<Project>>(this.project, { status: <ProjectStatus>option.value, finishedAt });
      this.shouldUpdateProject.next(this.project);
    }
  }
  createdTodo() {
    this.shouldLoadTodos.next(true);
  }
  delete() {
    const sure = confirm('delete?');
    if (sure) {
      this.addSubscription(
        this.projectService.delete(this.project.id).subscribe(success => {
          if (success) {
            this.router.navigate(['../'], {relativeTo: this.route});
          }
        })
      );
    }
  }

  private getProject(id: number) {
    this.addSubscription(
      this.projectService.getById(id).subscribe(project => {
        this.project = project;

        if (this.project) {
          this.titleControl.setValue(this.project.title);
          this.goalControl.setValue(this.project.goal);
          this.status = projectStatusOptions.find(a => a.value === this.project.status);
      
          this.defaultClarity = project.clarity || 0;
          this.startDate = this.project.startDate;
          this.endDate = this.project.endDate;
          this.startOfEndDate = addDays(this.startDate, 1).getTime();

          this.calcDays(this.project);
        }
      })
    );
  }
  private calcDays(project: Project) {
    this.totalDays = differenceInCalendarDays(project.endDate, project.startDate) + 1;
    this.usedDays = Math.max(differenceInCalendarDays(project.finishedAt || Date.now(), project.startDate), 0);
  }
  private getTodos(id: number) {
    this.addSubscription(
      this.shouldLoadTodos.asObservable().pipe(
        switchMap(() => this.todoService.getTodosByProjectId(id))
      ).subscribe(todos => {
        this.todos = todos;
        if (todos) {
          this.doneTodos = todos.filter(a => a.status === TodoStatus.Done);
          this.undoneTodos = todos.filter(a => a.status === TodoStatus.Doing);
          this.usedTime = this.todos.reduce((total, curr) => total + curr.usedTime, 0);
          this.canAddTodo = this.todos.length < 20;
        }
      })
    );
  }
  private updateProject() {
    this.addSubscription(
      this.shouldUpdateProject.asObservable().pipe(
        switchMap(project => {
          this.project = merge<Project, Partial<Project>>(project, { updatedAt: Date.now() });
          return this.projectService.update(this.project);
        })
      ).subscribe(success => {
      })
    );
  }
  private listenToTitleChange() {
    this.addSubscription(
      this.titleControl.value$.pipe(debounceTime(500)).subscribe(title => {
        this.project = merge<Project, Partial<Project>>(this.project, { title });
        this.shouldUpdateProject.next(this.project);
      })
    );
  }
  private listenToClarityChange() {
    this.addSubscription(
      this.clarityEvent.asObservable().pipe(debounceTime(500)).subscribe(clarity => {
        this.project = merge<Project, Partial<Project>>(this.project, { clarity });
        this.shouldUpdateProject.next(this.project);
      })
    );
  }
  private listenToGoalChange() {
    this.addSubscription(
      this.goalControl.value$.pipe(
        debounceTime(500)
      ).subscribe(goal => {
        this.project = merge<Project, Partial<Project>>(this.project, { goal });
        this.shouldUpdateProject.next(this.project);
      })
    );
  }

}
