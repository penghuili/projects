import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class InputService {
  private focus$ = new Subject<boolean>();

  getFocusStatus() {
    return this.focus$.asObservable().pipe(debounceTime(100));
  }
  isFocusing() {
    this.focus$.next(true);
  }
  isBlurred() {
    this.focus$.next(false);
  }
}
