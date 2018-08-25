import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { Subject, BehaviorSubject } from 'rxjs';
import {merge} from 'ramda';
import { ProjectService } from '../../core/services/project.service';
import { TodoService } from '../../core/services/todo.service';
import { InputControl } from '../../model/input-control';
import { PickerOption } from '../../model/picker';
import { Project, projectStatusOptions, ProjectStatus } from '../../model/project';
import { Tab } from '../../model/tab';
import { Todo, TodoStatus } from '../../model/todo';
import { Unsub } from '../../static/class/unsub';
import { switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'mst-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent extends Unsub implements OnInit {
  project: Project;
  todos: Todo[];
  doneTodos: Todo[];
  clearTodos: Todo[];
  titleControl = new InputControl<string>({ required: true });
  statusControl = new InputControl<PickerOption>({ required: true });
  goalControl = new InputControl<string>({ required: true });
  startDate: number;
  endDate: number;
  startOfEndDate: number;
  totalDays = 0;
  usedDays = 0;

  statusOptions = projectStatusOptions;
  tabs: Tab[] = [
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
  activeTab = 'report';

  private shouldUpdateProject = new Subject<Project>();
  private shouldLoadTodos = new BehaviorSubject<boolean>(true);

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private todoService: TodoService) {
      super();
    }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProject(id);
    this.getTodos(id);
    this.updateProject();
    this.listenToTitleChange();
    this.listenToStatusChange();
    this.listenToGoalChange();
  }

  changeTab(newTabKey: string) {
    this.activeTab = newTabKey;
  }
  pickStartDate(date: number) {
    this.startDate = date;
    this.startOfEndDate = addDays(this.startDate, 1).getTime();
    if (this.startDate > this.endDate) {
      this.endDate = addDays(this.startDate, 1).getTime();
    }
    this.project = merge<Project, Partial<Project>>(this.project, { startDate: this.startDate, endDate: this.endDate });
    this.shouldUpdateProject.next(this.project);
  }
  pickEndDate(date: number) {
    this.endDate = date;
    this.project = merge<Project, Partial<Project>>(this.project, { endDate: this.endDate });
    this.shouldUpdateProject.next(this.project);
  }
  createdTodo() {
    this.shouldLoadTodos.next(true);
  }

  private getProject(id: number) {
    this.addSubscription(
      this.projectService.getById(id).subscribe(project => {
        this.project = project;

        if (this.project) {
          this.titleControl.setValue(this.project.title);
          this.goalControl.setValue(this.project.goal);
          const statusOption: PickerOption = projectStatusOptions.find(a => a.value === this.project.status);
          this.statusControl.setValue(statusOption);
      
          this.startDate = this.project.startDate;
          this.endDate = this.project.endDate;
          this.startOfEndDate = addDays(this.startDate, 1).getTime();

          this.totalDays = differenceInCalendarDays(this.project.endDate, this.project.startDate) + 1;
          this.usedDays = Math.max(differenceInCalendarDays(this.project.finishedAt || Date.now(), this.project.startDate), 0);
        }
      })
    );
  }
  private getTodos(id: number) {
    this.addSubscription(
      this.shouldLoadTodos.asObservable().pipe(
        switchMap(() => this.todoService.getTodosByProjectId(id))
      ).subscribe(todos => {
        this.todos = todos;
        if (todos) {
          this.doneTodos = todos.filter(a => a.status === TodoStatus.Done);
          this.clearTodos = todos.filter(a => a.status === TodoStatus.Done || a.knowledge >= 0.5);
        }
      })
    );
  }
  private updateProject() {
    this.addSubscription(
      this.shouldUpdateProject.asObservable().pipe(
        switchMap(project => this.projectService.update(project))
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
  private listenToStatusChange() {
    this.addSubscription(
      this.statusControl.value$.subscribe(option => {
        this.project = merge<Project, Partial<Project>>(this.project, { status: <ProjectStatus>option.value });
        this.shouldUpdateProject.next(this.project);
      })
    );
  }
  private listenToGoalChange() {
    this.addSubscription(
      this.goalControl.value$.pipe(debounceTime(500)).subscribe(goal => {
        this.project = merge<Project, Partial<Project>>(this.project, { goal });
        this.shouldUpdateProject.next(this.project);
      })
    );
  }

}
