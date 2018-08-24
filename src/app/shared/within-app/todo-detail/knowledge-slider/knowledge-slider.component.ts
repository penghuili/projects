import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mst-knowledge-slider',
  templateUrl: './knowledge-slider.component.html',
  styleUrls: ['./knowledge-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class KnowledgeSliderComponent {
  @Input() set defaultKnowledge(value: number) {
    this._defaultKnowledge = value;
    this.knowledge = value;
  }
  get defaultKnowledge() {
    return this._defaultKnowledge;
  }
  @Output() newKnowledge = new EventEmitter<number>();

  knowledge: number;

  private _defaultKnowledge: number;

  handleNewKnowledge(knowledge: number) {
    this.knowledge = knowledge;
    this.newKnowledge.emit(knowledge);
  }
}
