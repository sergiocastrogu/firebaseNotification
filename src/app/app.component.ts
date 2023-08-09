import { Component } from '@angular/core';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebaseNotifications';

  constructor(private notificationService: NotificationsService) {
    this.notificationService.requestPermission();
  }
  ngOnInit(): void {
      this.notificationService.recieveMessage();
  }
}
