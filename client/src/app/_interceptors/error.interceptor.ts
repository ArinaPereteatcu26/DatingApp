import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NavigationExtras, Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error && error.error.errors) {

              console.log('Validation errors detected, passing to component');

            } else {

              toastr.error(error.error?.message || 'Bad Request', error.status.toString());
            }
            break;

          case 401:
            toastr.error('Unauthorized', error.status.toString());
            break;

          case 404:
            router.navigateByUrl('/not-found');
            break;

          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;

          default:
            if (!(error.status === 400 && error.error && error.error.errors)) {
              toastr.error('Something unexpected went wrong');
            }
            break;
        }
      }

      return throwError(() => error);
    })
  );
};
