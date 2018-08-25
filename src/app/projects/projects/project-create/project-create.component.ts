import { Component, EventEmitter, Output } from '@angular/core';
import { addDays } from 'date-fns';

import { ProjectService } from '../../../core/services/project.service';
import { InputControl } from '../../../model/input-control';
import { PickerOption } from '../../../model/picker';
import { Project, ProjectStatus, projectStatusOptions } from '../../../model/project';
import { Unsub } from '../../../static/class/unsub';

@Component({
  selector: 'mst-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent extends Unsub {
  @Output() created = new EventEmitter<boolean>();
  isShow = false;

  titleControl = new InputControl<string>({ required: true });
  goalControl = new InputControl<string>({ required: true });
  statusControl = new InputControl<PickerOption>({ required: true });

  defaultStartDate = Date.now();
  startOfDefaultEndDate = addDays(this.defaultStartDate, 1).getTime();
  defaultEndDate = this.startOfDefaultEndDate;

  statusOptions = projectStatusOptions;

  constructor(private projectService: ProjectService) {
    super();
    this.statusControl.setValue(this.statusOptions.find(a => a.value === ProjectStatus.Inactive));
  }

  open() {
    this.isShow = true;
  }
  pickStartDate(date: number) {
    this.defaultStartDate = date;
    this.startOfDefaultEndDate = addDays(this.defaultStartDate, 1).getTime();
    if (this.defaultStartDate > this.defaultEndDate) {
      this.defaultEndDate = this.startOfDefaultEndDate;
    }
  }
  pickEndDate(date: number) {
    this.defaultEndDate = date;
  }
  create() {
    if (this.titleControl.valid && this.goalControl.valid) {
      const timestamp = Date.now();
      const newProject: Project = {
        title: this.titleControl.getValue(),
        goal: this.goalControl.getValue(),
        startDate: this.defaultStartDate,
        endDate: this.defaultEndDate,
        status: <ProjectStatus>this.statusControl.getValue().value,
        createdAt: timestamp,
        updatedAt: timestamp,
        finishedAt: undefined,
        progress: 0
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
    this.defaultStartDate = Date.now();
    this.startOfDefaultEndDate = addDays(this.defaultStartDate, 1).getTime();
    this.defaultEndDate = this.startOfDefaultEndDate;
  }
}
