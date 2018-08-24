import { Component, OnInit } from '@angular/core';
import { addDays } from 'date-fns';

import { InputControl } from '../../model/input-control';
import { PickerOption } from '../../model/picker';
import { mapProjectStatusToText, Project, ProjectStatus } from '../../model/project';
import { Tab } from '../../model/tab';

@Component({
  selector: 'mst-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  titleControl = new InputControl<string>({ required: true });
  statusControl = new InputControl<PickerOption>({ required: true });
  startDate: number;
  endDate: number;
  startOfEndDate: number;
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
      goal: 'goal 1 goal 1 goal 1 goal 1 goal 1 goal 1 goal 1 goal 1 goal 1 goal 1 goal 1 goal 1 goal 1 goal 1 goal 1',
      status: ProjectStatus.Done,
      progress: 0.4
    }
    const statusOption: PickerOption = { value: this.project.status, text: mapProjectStatusToText(this.project.status) };
    this.statusControl.setValue(statusOption);

    this.titleControl.setValue(this.project.title);

    this.startDate = this.project.startDate;
    this.endDate = this.project.endDate;
    this.startOfEndDate = addDays(this.startDate, 1).getTime();
  }

  changeTab(newTabKey: string) {
    this.activeTab = newTabKey;
  }
  pickStartDate(date: number) {
    console.log(date)
    this.startDate = date;
    this.startOfEndDate = addDays(this.startDate, 1).getTime();
    if (this.startDate > this.endDate) {
      this.endDate = addDays(this.startDate, 1).getTime();
    }
  }
  pickEndDate(date: number) {
    console.log(date)
    this.endDate = date;
  }

}
