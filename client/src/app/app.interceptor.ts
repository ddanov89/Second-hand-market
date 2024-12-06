import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { API } from './constants';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorMessageService } from './error-message/error-message.service';

const { apiUrl } = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {

  const api = API;
  
  if (req.url.startsWith(api)) {
    req = req.clone({
      url: req.url.replace(api, apiUrl),
      withCredentials: true,
    });
  }

  const errorMessageService = inject(ErrorMessageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      } else if (err.status === 403) {
        localStorage.removeItem('user');
      } else {
        errorMessageService.setError(err);
      }
      return throwError(() => err);
    })
  );
};

