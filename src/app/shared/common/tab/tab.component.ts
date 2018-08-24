import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Tab } from '../../../model/tab';

@Component({
  selector: 'mst-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {
  @Input() tabs: Tab[] = [];
  @Input() defaultTabKey: string;
  @Output() newTab = new EventEmitter<string>();

  activeTabKey: string;

  ngOnInit() {
    if (this.defaultTabKey) {
      this.activeTabKey = this.defaultTabKey;
    } else if (this.tabs && this.tabs.length > 0) {
      this.activeTabKey = this.tabs[0].key;
    }
  }

  onClick(tabKey: string) {
    this.activeTabKey = tabKey;
    this.newTab.emit(tabKey);
  }

}
