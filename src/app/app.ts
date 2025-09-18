import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './shared/header/header';
import {Footer} from './shared/footer/footer';
import {ToastMessage, ToastNotification} from './services/toast-notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('picture-app-eval');

  protected readonly toastNotificationService = inject(ToastNotification);
  protected readonly toastColorMap: Record<ToastMessage['type'], string> = {
    success: 'text-bg-success',
    error: 'text-bg-danger',
    info: 'text-bg-info',
    warning: 'text-bg-warning',
  };
}
