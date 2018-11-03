import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../core/services/project.service';
import { TodoService } from '../../core/services/todo.service';
import { Project, ProjectStatus } from '../../model/project';
import { Todo, TodoStatus } from '../../model/todo';
import { DbService } from '../../core/services/db.service';
import { combineLatest } from 'rxjs';

declare var require: any;
const { version: appVersion } = require('../../../../package.json');
// Active = 'Active',
// Inactive = 'Inactive',
// WontDo = 'WontDo',
// Done = 'Done'
function mapProjectStatus(status) {
  switch(status) {
    case ProjectStatus.Active:
    case ProjectStatus.Inactive:
      return 'Want';
    default:
      return 'Finished';
  }
}
@Component({
  selector: 'mst-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  appVersion = appVersion;

  private projects: Project[];
  private todos: Todo[];
  private data: any;

  constructor(
    private db: DbService,
    private projectService: ProjectService,
    private todoService: TodoService) { }

  ngOnInit() {
    // this.projectService.getAll().subscribe(ps => {
    //   this.projects = ps;
    // })
    // this.todoService.getAll().subscribe(ts => {
    //   this.todos = ts;
    // })
    combineLatest(
      this.projectService.getAll(),
      this.todoService.getAll(),
    ).subscribe(([ps, ts]) => {
      const updatedProjects = ps.map(p => ({
        legacyId: p.id,
        title: p.title,
        note: p.goal,
        status: mapProjectStatus(p.status),
        createdAt: p.createdAt,
        finishedAt: p.finishedAt,
      }));
      const updatedTodos = ts.map(t => ({
        legacyProjectId: t.projectId,
        title: t.title,
        note: t.note,
        isClear: true,
        isFinished: t.status === TodoStatus.Done && !!t.finishedAt,
        createdAt: t.createdAt,
        finishedAt: t.finishedAt,
      }));
      this.data = {
        projects: updatedProjects,
        todos: updatedTodos
      };
    });
  }

  downloadAll() {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.data))}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'monster-projects.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
  loadProjects(event) {
    if (event.target && event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse((<any>e.target).result);
          if (data && data.length > 0) {
            this.db.getInstance().projects.bulkAdd(data)
              .then(res => {
                console.log(res);
              });
          }
        } catch (err) {
          alert(JSON.stringify(err));
        }
      }
      reader.readAsText(event.target.files[0])
    }
  }
  loadTodos(event) {
    if (event.target && event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse((<any>e.target).result);
          if (data && data.length > 0) {
            this.db.getInstance().todos.bulkAdd(data)
              .then(res => {
                console.log(res);
              });
          }
        } catch (err) {
          alert(JSON.stringify(err));
        }
      }
      reader.readAsText(event.target.files[0])
    }
  }
}
