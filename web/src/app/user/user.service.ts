import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { the_movie_database_api } from 'src/environments/environment';

interface Response {
  request_token: string,
  status_code: number,
  status_message: string,
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = the_movie_database_api.baseUrlv3;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
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
