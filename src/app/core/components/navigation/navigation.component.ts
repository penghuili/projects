import { Component, OnInit } from '@angular/core';

import { Unsub } from '../../../static/class/unsub';
import { ROUTES } from '../../../static/routes';
import { InputService } from '../../services/input.service';
import { MstLocalStorage } from '../../../model/storage';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'mst-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends Unsub implements OnInit {
  hideNavigation = false;
  routes = ROUTES;
  isAchievedHighlighted: boolean;

  constructor(private inputService: InputService) {
    super();
  }

  ngOnInit() {
    this.isAchievedHighlighted = this.shouldHighlight();
    this.addSubscription(
      this.inputService.getFocusStatus().subscribe(focus => {
        this.hideNavigation = focus;
      })
    );
  }

  goToAchieved() {
    MstLocalStorage.set('visitAchievedDate', Date.now());
  }

  private shouldHighlight(): boolean {
    const date = MstLocalStorage.get('visitAchievedDate');
    return date && differenceInCalendarDays(date, Date.now()) >= 7;
  }
 }
