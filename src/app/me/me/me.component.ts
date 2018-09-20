import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../core/services/project.service';
import { TodoService } from '../../core/services/todo.service';
import { Project } from '../../model/project';
import { Todo } from '../../model/todo';
import { DbService } from '../../core/services/db.service';

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
