import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;
    this.http.post(url, {username, password});
    const token = '';
    this.save(username, token);
    return new Observable();
  }

  signup(username: string, email:string, password: string): Observable<boolean> {
    const token = '';
    this.save(username, token);
    return new Observable();
  }

  save(username: string, token: string) {
    const my_token = JSON.stringify({
      username: username,
      token: token,
    });
    localStorage.setItem('movies-catalog-auth', my_token);
  }
}
