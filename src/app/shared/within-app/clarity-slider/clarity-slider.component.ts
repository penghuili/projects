import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-clarity-slider',
  templateUrl: './clarity-slider.component.html',
  styleUrls: ['./clarity-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ClaritySliderComponent {
  @Input() set defaultClarity(value: number) {
    this._defaultClarity = value;
    this.clarity = value;
  }
  get defaultClarity() {
    return this._defaultClarity;
  }
  @Output() newClarity = new EventEmitter<number>();

  clarity: number;

  private _defaultClarity = 0;

  handleNewClarity(clarity: number) {
    this.clarity = clarity;
    this.newClarity.emit(clarity);
  }
}
