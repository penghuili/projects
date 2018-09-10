import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-arrow-right',
  templateUrl: './arrow-right.component.html',
  styleUrls: ['./arrow-right.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArrowRightComponent {
  @Input() color: string;
}
