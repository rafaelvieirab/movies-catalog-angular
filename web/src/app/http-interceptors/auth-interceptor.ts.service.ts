import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { the_movie_database_api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const api_key = the_movie_database_api.key;
    const baseUrl = the_movie_database_api.baseUrlv3;

    const newReq = req.clone({
      responseType: 'json',
      setHeaders: {
        'Authorization': `Bearer ${api_key}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      url: baseUrl + req.url,
    });

    return next.handle(newReq);
  }

}
