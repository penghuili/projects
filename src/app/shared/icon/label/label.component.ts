import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LabelComponent {
  @Input() color: string;
}
