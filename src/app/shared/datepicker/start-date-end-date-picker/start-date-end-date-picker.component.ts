import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

import { StartDateEndDate } from '../../../model/time';
import { startOfDay, endOfDay, differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'mst-start-date-end-date-picker',
  templateUrl: './start-date-end-date-picker.component.html',
  styleUrls: ['./start-date-end-date-picker.component.scss']
})
export class StartDateEndDatePickerComponent {
  @Input() startDate = Date.now();
  @Input() defaultStartDate = Date.now();
  @Input() defaultEndDate = Date.now();
  @Output() newStartEnd = new EventEmitter<StartDateEndDate>();
  days = 1;

  private start = Date.now();
  private end = Date.now();
  constructor() { }

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
    this.days = differenceInCalendarDays(this.end, this.start) + 1;
    const start = startOfDay(this.start).getTime();
    const end = endOfDay(this.end).getTime();
    return {start, end}
  }
}
