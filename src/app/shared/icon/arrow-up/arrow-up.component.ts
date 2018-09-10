import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-arrow-up',
  templateUrl: './arrow-up.component.html',
  styleUrls: ['./arrow-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArrowUpComponent {
  @Input() color: string;
}
