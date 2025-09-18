import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthenticationApi } from '../authentication/authentication-api';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const authApi = inject(AuthenticationApi);
  const router = inject(Router);

  const clone = req.clone({
    url: req.url.startsWith('http') ? req.url : environment.apiUrl + req.url,
    withCredentials: true,
    setHeaders: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  return next(clone).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Automatically clear session and redirect to login
        localStorage.removeItem('user');
        authApi.user.set(null);
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
