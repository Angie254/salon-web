import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { token } from '@babel/generator/lib';
import {AppSettings} from './app.config';
import { User } from '../_constants/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

login(username: string, password: string, category: string): Observable<User> {
    // console.log(`login was triggered by user ${username} with password ${password} and category ${category}`);
    return this.http.post<User>(`${AppSettings.API_ENDPOINT}/salon-web/client_login`, { username: username, password: password,
      category: category })
      .pipe(map(user => {
        // login successful if there's a JSON web token in the response
        if (user.ok === 'true' && user.token) {
          // store user details and JSON web token in local storage to keep user logged in between page refreshes
          localStorage.setItem('loggedUser', JSON.stringify(user));
        }

        return user;
      }));
  }


logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
