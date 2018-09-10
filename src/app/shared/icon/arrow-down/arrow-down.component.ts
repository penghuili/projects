import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-arrow-down',
  templateUrl: './arrow-down.component.html',
  styleUrls: ['./arrow-down.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArrowDownComponent {
  @Input() color: string;
}
