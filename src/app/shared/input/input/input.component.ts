import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { InputService } from '../../../core/services/input.service';
import { InputControl } from '../../../model/input-control';
import { Unsub } from '../../../static/class/unsub';

@Component({
  selector: 'mst-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends Unsub implements OnInit, OnChanges {
  @Input() control: InputControl<string>;
  @Input() autoFocus = false;
  @Input() disabled: boolean;
  @Input() minHeight = '1.5rem';
  @Input() hasBorder = true;
  @Output() enter = new EventEmitter<boolean>();

  @ViewChild('input') private inputEl: ElementRef;

  constructor(private inputService: InputService) {
    super();
  }

  ngOnInit() {
    if (this.autoFocus) {
      this.inputEl.nativeElement.focus();
    }
    this.addSubscription(
      this.control.setValue$.subscribe(value => {
        this.inputEl.nativeElement.innerText = value === undefined || value === null ? '' : value;
      })
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['disabled']) {
      if (this.disabled) {
        this.disableEditable();
      } else {
        this.enableEditable();
      }
    }
  }

  onFocus() {
    this.inputService.isFocusing();
  }
  onBlur() {
    this.inputService.isBlurred();
  }
  onKeyup(e: KeyboardEvent) {
    this.control.receiveValue(this.getText());
    if (e.keyCode === 13) {
      this.enter.emit(true);
    }
  }

  // can't [contenteditable]="disabled" in template
  private disableEditable() {
    if (this.inputEl && this.inputEl.nativeElement) {
      (<HTMLDivElement>this.inputEl.nativeElement).setAttribute('contenteditable', 'false');
    }
  }
  private enableEditable() {
    if (this.inputEl && this.inputEl.nativeElement) {
      (<HTMLDivElement>this.inputEl.nativeElement).setAttribute('contenteditable', 'true');
    }
  }
  private getText(): string {
    return this.inputEl.nativeElement.innerText;
  }
}
