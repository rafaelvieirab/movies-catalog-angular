import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { the_movie_database_api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddApiDataInterceptor implements HttpInterceptor {

  private api_key = the_movie_database_api.key;
  private baseUrl = the_movie_database_api.baseUrlv3;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      responseType: 'json',
      setHeaders: {
        'Authorization': `Bearer ${this.api_key}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      url: this.baseUrl + request.url,
    });

    return next.handle(newRequest);
  }
}
