import {Component, inject, computed} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationApi} from '../../authentication/authentication-api';

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
  protected readonly authApi = inject(AuthenticationApi);
  protected readonly router = inject(Router);

  protected readonly currentUser = computed(() => this.authApi.user());

  protected readonly isLoggedIn = computed(() => this.currentUser() !== null);

  protected readonly links = computed<Link[]>(() => {
    if (this.isLoggedIn()) {
      return [
        {name: 'Home', path: '/'},
        {name: 'Add Picture', path: 'add-picture'},
      ];
    }
    return [
      {name: 'Home', path: '/'},
      {name: 'Register', path: '/register'},
      {name: 'Login', path: '/login'}
    ];
  });

  onLogout() {
    this.authApi.logout().subscribe({
      next: () => {
        void this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        void this.router.navigate(['/']);
      }
    });
  }

}
