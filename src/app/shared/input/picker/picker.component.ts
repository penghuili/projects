import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { InputControl } from '../../../model/input-control';
import { PickerOption } from '../../../model/picker';
import { Unsub } from '../../../static/class/unsub';

@Component({
  selector: 'mst-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerComponent extends Unsub implements OnInit {
  @Input() control: InputControl<PickerOption>;
  @Input() options: PickerOption[];
  @Input() disabled = false;

  isShow = false;
  showError: boolean;
  innerOption: PickerOption;
  private outerOption: PickerOption;

  constructor() {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.control.setValue$.subscribe(value => {
        this.outerOption = value;
        this.innerOption = value;
      })
    );
  }

  onOpen() {
    this.isShow = true;
  }
  onSelect(option: PickerOption) {
    if (this.canSelect(option)) {
      this.innerOption = option;
    }
  }

  onConfirm() {
    if (this.canSelect(this.innerOption)) {
      this.isShow = false;
      this.outerOption = this.innerOption;
      this.control.receiveValue(this.innerOption);
    }
  }
  onCancel() {
    this.innerOption = this.outerOption;
    this.isShow = false;
  }

  // TODO
  private canSelect(option: PickerOption): boolean {
    this.showError = false;
    return !this.showError;
  }

}
