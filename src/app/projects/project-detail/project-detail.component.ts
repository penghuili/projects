import { Component, OnInit } from '@angular/core';
import { merge } from 'ramda';

import { InputControl } from '../../model/input-control';
import { PickerOption } from '../../model/picker';
import { Project, ProjectStatus, mapProjectStatusToText } from '../../model/project';

@Component({
  selector: 'mst-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  titleControl = new InputControl<string>({ required: true });
  statusControl = new InputControl<PickerOption>({ required: true });
  statusOptions: PickerOption[] = [
    {
      value: ProjectStatus.Inactive,
      text: 'inactive'
    },
    {
      value: ProjectStatus.Active,
      text: 'active'
    },
    {
      value: ProjectStatus.WontDo,
      text: `won't do`
    },
    {
      value: ProjectStatus.Done,
      text: 'done'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.project = {
      id: 1,
      title: 'project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1 project 1',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      finishedAt: undefined,
      startDate: Date.now(),
      endDate: Date.now(),
      goal: 'goal 1',
      status: ProjectStatus.Done,
      progress: 0.4
    }
    const statusOption: PickerOption = { value: this.project.status, text: mapProjectStatusToText(this.project.status) };
    this.statusControl.setValue(statusOption);
  }

  onSelectStatus(status: ProjectStatus) {
    this.project = merge<Project, Partial<Project>>(this.project, {status});
  }

}
