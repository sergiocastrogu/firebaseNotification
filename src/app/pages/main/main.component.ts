import { Component, OnInit } from '@angular/core';
import { NotificationPayload } from 'firebase/messaging';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private notificationService: NotificationsService) {
    this.notificationService.notificationArrived.subscribe(
      (payload: NotificationPayload) => {
        this.showNotificationInForeground(payload);
      }
    );
  }

  ngOnInit(): void {}

  showNotificationInForeground(payload) {
    console.log(payload);
  }
}
