import { Component, EventEmitter, Output } from '@angular/core';

import { ProjectService } from '../../core/services/project.service';
import { InputControl } from '../../model/input-control';
import { Project, ProjectStatus } from '../../model/project';
import { Unsub } from '../../static/class/unsub';

@Component({
  selector: 'mst-achieved-create',
  templateUrl: './achieved-create.component.html',
  styleUrls: ['./achieved-create.component.scss']
})
export class AchievedCreateComponent extends Unsub {
  @Output() created = new EventEmitter<boolean>();
  isShow = false;

  titleControl = new InputControl<string>({ required: true });
  goalControl = new InputControl<string>({ required: true });

  constructor(private projectService: ProjectService) {
    super();
  }

  open() {
    this.isShow = true;
  }
  create() {
    if (this.titleControl.valid && this.goalControl.valid) {
      const timestamp = Date.now();
      const newProject: Project = {
        title: this.titleControl.getValue(),
        goal: this.goalControl.getValue(),
        startDate: timestamp,
        endDate: timestamp,
        status: ProjectStatus.Done,
        createdAt: timestamp,
        updatedAt: timestamp,
        finishedAt: timestamp,
        progress: 1,
        clarity: 1,
      };
      this.addSubscription(
        this.projectService.create(newProject).subscribe(newId => {
          if (newId) {
            this.isShow = false;
            this.created.emit(true);
            this.reset();
          }
        })
      );
    }
  }
  onCancel() {
    this.isShow = false;
    this.reset();
  }

  private reset() {
    this.titleControl.reset();
    this.goalControl.reset();
  }
}
