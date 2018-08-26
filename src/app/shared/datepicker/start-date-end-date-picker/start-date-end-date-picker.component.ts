import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { StartDateEndDate } from '../../../model/time';
import { startOfDay, endOfDay } from 'date-fns';

@Component({
  selector: 'mst-start-date-end-date-picker',
  templateUrl: './start-date-end-date-picker.component.html',
  styleUrls: ['./start-date-end-date-picker.component.scss']
})
export class StartDateEndDatePickerComponent implements OnInit {
  @Input() startDate = Date.now();
  @Output() newStartEnd = new EventEmitter<StartDateEndDate>();
  defaultStartDate: number;
  defaultEndDate: number;

  private start: number;
  private end: number;
  constructor() { }

  ngOnInit() {
    const now = Date.now();
    this.defaultStartDate = now;;
    this.start = now;
    this.defaultEndDate = now;
    this.end = now;

    this.newStartEnd.emit(this.formatStartEnd());
  }

  changeStartDate(date: number) {
    this.start = date;
    if (this.start > this.end) {
      this.defaultEndDate = this.start;
      this.end = this.start;
    }
    this.newStartEnd.emit(this.formatStartEnd());
  }
  changeEndDate(date: number) {
    this.end = date;
    if (this.end < this.start) {
      this.defaultStartDate = this.end;
      this.start = this.end;
    }
    this.newStartEnd.emit(this.formatStartEnd());
  }

  private formatStartEnd(): StartDateEndDate {
    const start = startOfDay(this.start).getTime();
    const end = endOfDay(this.end).getTime();
    return {start, end}
  }
}
