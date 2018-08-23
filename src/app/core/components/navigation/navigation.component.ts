import { Component, OnInit } from '@angular/core';

import { Unsub } from '../../../static/class/unsub';
import { ROUTES } from '../../../static/routes';
import { InputService } from '../../services/input.service';

@Component({
  selector: 'mst-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends Unsub implements OnInit {
  hideNavigation = false;
  routes = ROUTES;

  constructor(private inputService: InputService) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.inputService.getFocusStatus().subscribe(focus => {
        this.hideNavigation = focus;
      })
    );
  }
}
