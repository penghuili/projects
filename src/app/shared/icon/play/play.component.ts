import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayComponent {
  @Input() color: string;
}