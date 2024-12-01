import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { API } from './constants';
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

const { apiUrl } = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const api = API;
  if (req.url.startsWith(api)) {
    req = req.clone({
      url: req.url.replace(api, apiUrl),
      withCredentials: true,
    });
  }

  const errorService = inject(ErrorMsgService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      } else {
        errorService.setError(err);
        router.navigate(['error']);
      }
      return [err];
    })
  );
};
