import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ProjectService } from '../../../core/services/project.service';
import { Project, ProjectStatus } from '../../../model/project';
import { Unsub } from '../../../static/class/unsub';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'mst-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent extends Unsub implements OnInit {
  @Input() set activeProject(value: Project) {
    this._activeProject = value;
    this.outerProject = value;
    this.innerProject = value;
  }
  get activeProject() {
    return this._activeProject;
  }
  @Input() disabled = false;
  @Input() hasError: boolean;
  @Output() selected = new EventEmitter<Project>();

  projects: Project[];
  activeProjects: Project[];
  inactiveProjects: Project[];

  isShow = false;

  outerProject: Project;
  innerProject: Project;

  private _activeProject: Project;
  private shouldLoad = new BehaviorSubject<boolean>(true);

  constructor(private projectService: ProjectService) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.shouldLoad.asObservable().pipe(
        switchMap(() => this.projectService.getInProgress())
      ).subscribe(projects => {
        this.projects = projects || [];
        this.activeProjects = this.projects.filter(a => a.status === ProjectStatus.Active);
        this.inactiveProjects = this.projects.filter(a => a.status === ProjectStatus.Inactive);
      })
    );
  }

  open() {
    if (!this.disabled) {
      this.isShow = true;
    }
  }
  close() {
    this.isShow = false;
    this.innerProject = this.outerProject;
  }
  selectProject(project: Project) {
    this.innerProject = project;
    this.selected.emit(project);
    this.isShow = false;
  }
  createdProject() {
    this.shouldLoad.next(true);
  }
}
