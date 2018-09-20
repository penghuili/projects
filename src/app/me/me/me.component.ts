import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../core/services/project.service';
import { TodoService } from '../../core/services/todo.service';
import { Project } from '../../model/project';
import { Todo } from '../../model/todo';

declare var require: any;
const { version: appVersion } = require('../../../../package.json');

@Component({
  selector: 'mst-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  appVersion = appVersion;

  private projects: Project[];
  private todos: Todo[];

  constructor(private projectService: ProjectService,
    private todoService: TodoService) { }

  ngOnInit() {
    this.projectService.getAll().subscribe(ps => {
      this.projects = ps;
    })
    this.todoService.getAll().subscribe(ts => {
      this.todos = ts;
    })
  }

  downloadProjects() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.projects));
    const el = document.getElementById('mst-download-projects');
    el.setAttribute('href', dataStr);
    el.setAttribute('download', "projects.json");
    el.click();
  }
  downloadTodos() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.todos));
    const el = document.getElementById('mst-download-todos');
    el.setAttribute('href', dataStr);
    el.setAttribute('download', "todos.json");
    el.click();
  }
}
