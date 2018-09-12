import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PickerOption } from '../../../model/picker';

@Component({
  selector: 'mst-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerComponent {
  @Input() set defaultValue(value: PickerOption) {
    this.outerOption = value;
    this.innerOption = value;
  }
  @Input() options: PickerOption[];
  @Input() disabled = false;
  @Output() newValue = new EventEmitter<PickerOption>();

  isShow = false;
  showError: boolean;
  innerOption: PickerOption;
  private outerOption: PickerOption;

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
      this.newValue.emit(this.innerOption);
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
