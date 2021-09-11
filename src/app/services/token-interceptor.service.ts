import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInerceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let usersService = this.injector.get(UsersService);
    const token = `Bearer ${usersService.getToken()}`;
    let tokenReq = req.clone({
      headers: req.headers.set('Authorization', token),
    });
    return next.handle(tokenReq);
  }
}
