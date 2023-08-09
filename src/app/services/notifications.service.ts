import { EventEmitter, Injectable, Output } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  
  constructor() {}
  @Output() notificationArrived = new EventEmitter<any>();
  @Output() tokenRecived = new EventEmitter<any>();


  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log(currentToken);
           this.tokenRecived.emit(currentToken);
           sessionStorage.setItem('tokenFCM', currentToken);
         } else {
           console.error('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.error('An error occurred while retrieving token. ', err);
    });
  }

  recieveMessage(){
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this.notificationArrived.emit(payload.notification);
    });

    onMessage(messaging, (payload)=>{
      this.notificationArrived.next(payload.notification);
    })
  }

}
