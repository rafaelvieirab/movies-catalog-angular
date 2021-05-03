import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const token = '';
    this.save(username, token);
    return new Observable();
  }

  //User Authorization
  /*
  Basic Workflow

    - Generate a new token request;
    - Send the user to TMDb asking the user to approve the token;
    - With an approved request token, generate a acess token;
  */
  handle() {
    let request_token;
    this.createTokenRequest().subscribe(response => {
      if(response.success) {
        request_token = response.request_token;
        //enviar o usuário para outra janela, para aceitar
        
      } else {
        console.error('Eror');
      }
    });
  }

  createTokenRequest(): Observable<Response> {
    const baseUrl = ''; //'https://api.themoviedb.org/4'
    const url = baseUrl + '/auth/request_token';

    const body = {
      "redirect_to": "http://www.themoviedb.org/"
    }

    return this.http.post<Response>(url, body);
  }

  save(username: string, token: string) {
    const my_token = JSON.stringify({
      username: username,
      token: token,
    });
    localStorage.setItem('movies-catalog-token', my_token);
  }
}
