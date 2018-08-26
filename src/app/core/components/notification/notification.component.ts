import { Component, OnInit } from '@angular/core';
import { Unsub } from '../../../static/class/unsub';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'mst-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends Unsub implements OnInit {
  message = '';

  constructor(private notificationService: NotificationService) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.notificationService.getMessage().subscribe(m => {
        this.message = m;
      })
    );
  }

}