import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(localStorage.getItem('token'));
    
    if (localStorage.getItem('token')) {
      
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
    }
    return next.handle(request);
  }
}
