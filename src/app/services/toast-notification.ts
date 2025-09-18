import {Injectable, signal} from '@angular/core';

export interface ToastMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastNotification {
  private readonly notificationsSignal = signal<ToastMessage[]>([]);
  readonly notifications = this.notificationsSignal.asReadonly();

  addMessage(message: ToastMessage) {
    this.notificationsSignal.update(x => [...x, message]);

    setTimeout(() => {
      this.removeMessage(message);
    }, 5000);
  }

  removeMessage(message: ToastMessage) {
    this.notificationsSignal.update(notifications => notifications.filter(n => n !== message));
  }
}

