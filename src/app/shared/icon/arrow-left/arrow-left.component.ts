import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-arrow-left',
  templateUrl: './arrow-left.component.html',
  styleUrls: ['./arrow-left.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArrowLeftComponent {
  @Input() color: string;
}
