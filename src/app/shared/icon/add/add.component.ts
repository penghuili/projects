import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent {
  @Input() color: string;
}
