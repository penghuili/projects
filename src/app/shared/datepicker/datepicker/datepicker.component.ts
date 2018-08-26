import { Component, EventEmitter, Input, Output } from '@angular/core';
import { setYear } from 'date-fns';


@Component({
  selector: 'mst-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
  @Input() set defaultDate(value: number) {
    value = Math.round(value);
    this.outerDate = value;
    this.innerDate = value;
  }
  @Input() startDate = Date.now();
  @Input() endDate: number;
  @Input() disabled = false;
  @Output() newDate = new EventEmitter<number>();
  outerDate = Date.now();
  innerDate = this.outerDate;

  isShowDatepicker = false;
  isShowYear = false;

  onOpenDatepicker() {
    if (!this.disabled) {
      this.innerDate = this.outerDate;
      this.isShowDatepicker = true;
    }
  }
  onOpenYear() {
    this.isShowYear = true;
  }
  onGotoToday() {
    this.innerDate = Date.now();
  }
  onSelectYear(y: number) {
    this.isShowYear = false;
    this.innerDate = setYear(this.innerDate, y).getTime();
  }
  onSelectDate(date: number) {
    this.innerDate = date;
  }
  onFinish() {
    this.outerDate = this.innerDate;
    this.newDate.emit(this.innerDate);
    this.isShowDatepicker = false;
  }
  onCancel() {
    this.isShowDatepicker = false;
    this.innerDate = this.outerDate;
  }
}
