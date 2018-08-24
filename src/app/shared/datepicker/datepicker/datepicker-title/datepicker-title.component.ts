import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mst-datepicker-title',
  templateUrl: './datepicker-title.component.html',
  styleUrls: ['./datepicker-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerTitleComponent {
  @Input() date: number;
  @Output() openYear = new EventEmitter<boolean>();
  @Output() today = new EventEmitter<boolean>();
}
