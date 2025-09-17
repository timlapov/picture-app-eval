import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

interface Link {
  name: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  //protected readonly authenticatedApi = signal(AuthenticationApi);

  protected readonly links = signal<Link[]>([
    {name: 'Home', path: '/'},
    {name: 'Register', path: '/register'},
    {name: 'Login', path: '/login'}
  ]);
}
