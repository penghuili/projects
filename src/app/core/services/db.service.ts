import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Todo } from '../../model/todo';
import { Project } from '../../model/project';

class MonsterDB extends Dexie {
  todos: Dexie.Table<Todo, number>;
  projects: Dexie.Table<Project, number>;

  constructor() {
    super('projects');
    this.version(1).stores({
      todos: '++id,projectId,happenDate,expectedTime,status',
      projects: '++id,status,startDate,endDate',
    });
    this.version(2).stores({
      todos: '++id,projectId,happenDate,finishedAt,expectedTime,status'
    });
  }
}

@Injectable()
export class DbService {
  private db: MonsterDB;
  constructor() {
    if (this.isDBSupported() && !this.isPrivateMode()) {
      this.db = new MonsterDB();
      this.db.open().catch(function (e) {
        alert('open db error');
      });
    }
  }

  getInstance(): MonsterDB {
    return this.db;
  }

  isDBSupported(): boolean {
    return !!window.indexedDB;
  }
  isPrivateMode(): boolean {
    try {
      localStorage.setItem('mst-test-private-mode', 'test');
      localStorage.removeItem('mst-test-private-mode');
      return false;
    } catch (e) {
      return true;
    }
  }
}
