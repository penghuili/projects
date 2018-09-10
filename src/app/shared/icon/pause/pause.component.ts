import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PauseComponent {
  @Input() color: string;
}