import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import * as Hammer from 'hammerjs';

import { FONT_SIZE } from '../../../static/config';

@Component({
  selector: 'mst-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnChanges, OnInit {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() defaultValue = 0;
  @Output() valueChange = new EventEmitter<number>();
  @ViewChild('bar') bar: ElementRef;
  @ViewChild('thumb') thumb: ElementRef;

  currentValue: number;
  left: number;
  deltaX: number;

  private barWidth: number;

  ngOnInit() {
    this.barWidth = this.bar.nativeElement.clientWidth;
    this.setDefaultLeft();
    this.currentValue = this.getValue();

    const hammer = new Hammer(this.thumb.nativeElement);
    hammer.on('panmove', (e) => {
      this.deltaX = e.deltaX;
      this.currentValue = this.getValue();
      this.valueChange.emit(this.currentValue);
    });
    hammer.on('panend', (e) => {
      this.left = this.getLeft();
      this.deltaX = 0;
    });
  }
  ngOnChanges() {
    this.setDefaultLeft();
  }

  getLeft() {
    const sum = this.left + this.deltaX;
    if (sum < (- FONT_SIZE)) {
      return - FONT_SIZE;
    } else if (sum > (this.barWidth - FONT_SIZE)) {
      return this.barWidth - FONT_SIZE;
    } else {
      return sum;
    }
  }
  getWidth() {
    const left = this.getLeft();
    return left < 0 ? 0 : left;
  }
  private getValue() {
    const value = ((this.getLeft() + FONT_SIZE) / this.barWidth) * (this.max - this.min);
    const stepped = Math.round(value / this.step) * this.step + this.min;
    return this.step < 1 ? +stepped.toFixed(1) : stepped;
  }
  private setDefaultLeft() {
    if (this.barWidth) {
      this.left = Math.round(this.defaultValue / this.max * this.barWidth) - FONT_SIZE / 2;
      this.deltaX = 0;
    }
  }
}
