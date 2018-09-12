import { Component, EventEmitter, Output, Input } from '@angular/core';
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
  @Input() useActionButton = true;
  @Output() created = new EventEmitter<boolean>();
  isShow = false;
  clarity = 0;

  titleControl = new InputControl<string>({ required: true });
  goalControl = new InputControl<string>();
  status: PickerOption;

  defaultStartDate = Date.now();
  startOfDefaultEndDate = addDays(this.defaultStartDate, 1).getTime();
  defaultEndDate = this.startOfDefaultEndDate;

  statusOptions = projectStatusOptions;

  constructor(private projectService: ProjectService) {
    super();
    this.status = this.statusOptions.find(a => a.value === ProjectStatus.Inactive);
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
  clarityChange(clarity: number) {
    this.clarity = clarity;
  }
  selectStatus(option: PickerOption) {
    this.status = option;
  }
  create() {
    if (this.titleControl.valid) {
      const timestamp = Date.now();
      const newProject: Project = {
        title: this.titleControl.getValue(),
        goal: this.goalControl.getValue(),
        startDate: this.defaultStartDate,
        endDate: this.defaultEndDate,
        status: <ProjectStatus>this.status.value,
        createdAt: timestamp,
        updatedAt: timestamp,
        finishedAt: undefined,
        progress: 0,
        clarity: this.clarity,
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
