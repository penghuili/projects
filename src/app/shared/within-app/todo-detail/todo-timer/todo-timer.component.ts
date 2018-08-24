import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { add0 } from '../../../../model/time';

@Component({
  selector: 'mst-todo-timer',
  templateUrl: './todo-timer.component.html',
  styleUrls: ['./todo-timer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoTimerComponent implements OnChanges, OnInit {
  @Input() expectedTime: number;
  @Input() usedTime: number;
  @Output() newTime = new EventEmitter<number>();

  progress = 0;
  label: string;
  totalTime: string;
  isDoing: boolean;

  private prevProgress: number;
  private sub: Subscription;
  private startTime: number;

  ngOnInit() {
    fromEvent(window, 'focus').pipe(
      filter(() => this.isDoing)
    ).subscribe(() => {
      this.start();
    });
  }
  ngOnChanges() {
    if (this.expectedTime && this.usedTime !== undefined) {
      this.expectedTime = this.expectedTime;
      this.usedTime = this.usedTime || 0;
      this.totalTime = this.parseSeconds(this.expectedTime);
      this.label = this.parseSeconds(this.usedTime);
      this.prevProgress = this.usedTime / this.expectedTime;
      this.progress = this.prevProgress;
    }
  }

  toggleTimer() {
    if (this.isDoing) {
      this.stop();
    } else {
      this.start();
    }
  }

  private start() {
    if (this.expectedTime) {
      this.isDoing = true;
      if (this.sub) {
        this.sub.unsubscribe();
      }
      let inActiveTime: number;
      const timestamp = Date.now();
      if (!this.startTime) {
        inActiveTime = 0;
        this.startTime = timestamp;
      } else {
        inActiveTime = Math.round((timestamp - this.startTime) / 1000);
        this.startTime = timestamp;
      }
      this.sub = interval(1000).subscribe(a => {
        this.progress = this.prevProgress + (a + inActiveTime) / this.expectedTime;
        this.label = this.parseSeconds(a + inActiveTime + this.usedTime);
      });
    }
  }
  private stop() {
    this.newTime.emit(Math.round((Date.now() - this.startTime) / 1000))
    this.isDoing = false;
    this.startTime = undefined;
    this.sub.unsubscribe();
  }
  private parseSeconds(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds - hours * 3600) / 60);
    const secs = seconds - hours * 3600 - mins * 60;
    return `${add0(hours)}:${add0(mins)}:${add0(secs)}`;
  }
}
