import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CloseComponent {
  @Input() color: string;
}
