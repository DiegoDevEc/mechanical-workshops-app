import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from '../api/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {

        if (token) {

          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(clonedRequest);
        }
        return next.handle(req);
      })
    );
  }
}
