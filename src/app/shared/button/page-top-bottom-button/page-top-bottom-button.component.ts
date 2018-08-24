import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Unsub } from '../../../static/class/unsub';
import { FONT_SIZE } from '../../../static/config';

@Component({
  selector: 'mst-page-top-bottom-button',
  templateUrl: './page-top-bottom-button.component.html',
  styleUrls: ['./page-top-bottom-button.component.scss']
})
export class PageTopBottomButtonComponent extends Unsub implements OnInit {

  showToBottom = true;

  constructor() {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      fromEvent(window, 'scroll').pipe(debounceTime(300)).subscribe(() => {
        this.showToBottom = window.scrollY + window.innerHeight + FONT_SIZE * 2 < document.body.offsetHeight;
      })
    );
  }

  onToTop() {
    window.scrollTo(0, 0);
  }
  onToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
