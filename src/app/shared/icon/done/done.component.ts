import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DoneComponent {
  @Input() color: string;
}
