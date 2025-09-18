import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthenticationApi} from '../authentication/authentication-api';

export const authGuard: CanActivateFn = (route, state) => {
  const authApi = inject(AuthenticationApi);
  const router = inject(Router);

  if (authApi.user() !== null) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
