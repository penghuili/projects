import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { addMonths, endOfDay, getDaysInMonth, setDate, startOfDay, startOfMonth, getYear, getMonth, setYear, setMonth, setDay } from 'date-fns';

import { isWithin } from '../../../../model/time';

@Component({
  selector: 'mst-datepicker-month',
  templateUrl: './datepicker-month.component.html',
  styleUrls: ['./datepicker-month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerMonthComponent implements OnChanges {
  @Input() set activeDate(value: number) {
    this.originalDate = value;
    this.oneDayOfCurrentMonth = value !== undefined ? value : Date.now();
  }
  @Input() startDate: number;
  @Input() endDate: number;
  @Output() selectDate = new EventEmitter<number>();
  weeks: DayItem[] = [
    { value: 'M', selected: false, valid: true},
    { value: 'T', selected: false, valid: true},
    { value: 'W', selected: false, valid: true},
    { value: 'T', selected: false, valid: true},
    { value: 'F', selected: false, valid: true},
    { value: 'S', selected: false, valid: true},
    { value: 'S', selected: false, valid: true},
  ];
  row1: DayItem[];
  row2: DayItem[];
  row3: DayItem[];
  row4: DayItem[];
  row5: DayItem[];
  row6: DayItem[];

  oneDayOfCurrentMonth: number;
  private originalDate: number;

  ngOnChanges() {
    if (this.startDate && this.oneDayOfCurrentMonth) {
      this.createRows();
    }
  }

  nextMonth() {
    this.oneDayOfCurrentMonth = addMonths(this.oneDayOfCurrentMonth, 1).getTime();
    this.createRows();
  }
  prevMonth() {
    this.oneDayOfCurrentMonth = addMonths(this.oneDayOfCurrentMonth, -1).getTime();
    this.createRows();
  }
  onSelectDate(day: number) {
    const year = getYear(this.oneDayOfCurrentMonth);
    const month = getMonth(this.oneDayOfCurrentMonth);
    const selected = setDate(setMonth(setYear(Date.now(), year), month), day).getTime();
    this.selectDate.emit(selected);
  }

  private isSelected(day: number): boolean {
    if (!day || this.originalDate === undefined || this.oneDayOfCurrentMonth === undefined) {
      return false;
    }
    const startOfActiveDay = startOfDay(this.originalDate).getTime();
    const endOfActiveDay = endOfDay(this.originalDate).getTime();
    const currentDay = setDate(this.oneDayOfCurrentMonth, day).getTime();
    return isWithin(currentDay, startOfActiveDay, endOfActiveDay);
  }
  private isValid(day: number): boolean {
    if (!day || this.oneDayOfCurrentMonth === undefined || !this.startDate) {
      return true;
    }
    const date = setDate(this.oneDayOfCurrentMonth, day).getTime();
    return isWithin(date, this.startDate, this.endDate);
  }
  private createRows() {
    this.row1 = [];
    this.row2 = [];
    this.row3 = [];
    this.row4 = [];
    this.row5 = [];
    this.row6 = [];

    const totalDays = getDaysInMonth(this.oneDayOfCurrentMonth);
    const weekDayOfFirstDay = startOfMonth(this.oneDayOfCurrentMonth).getDay() || 7;
    Array(42).fill(1).forEach((a, i) => {
      const j = i + 1;
      const value = j < weekDayOfFirstDay || j > (weekDayOfFirstDay + totalDays - 1) ? '' : j - weekDayOfFirstDay + 1;
      const valid = this.isValid(+value);
      const selected = this.isSelected(+value);
      const data = { value, selected, valid };
      if (j <= 7) {
        this.row1.push(data);
      } else if (j <= 14) {
        this.row2.push(data);
      } else if (j <= 21) {
        this.row3.push(data);
      } else if (j <= 28) {
        this.row4.push(data);
      } else if (j <= 35) {
        this.row5.push(data);
      } else {
        this.row6.push(data);
      }
    });
  }

}

export interface DayItem {
  value: string | number;
  selected: boolean;
  valid: boolean;
}
