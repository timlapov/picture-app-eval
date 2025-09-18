import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../../environments/environment.development';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const clone = req.clone({
    url: req.url.startsWith('http') ? req.url : environment.apiUrl + req.url,
    withCredentials: true,
    setHeaders: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
  return next(clone);
};
