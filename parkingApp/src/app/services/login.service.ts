import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicUser, User } from '../typings/user';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: BasicUser
  token = '';
  private headers = new HttpHeaders()
  .set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  login(user: BasicUser): Observable<any> {
    return this.http.post(`${environment.server}/users/login`, {username: user.username, password: user.password}, {headers: this.headers} );
  }

  register(user: User): Observable<any> {
    return this.http.post(`${environment.server}/users/add`,{username: user.username, password: user.password} );
  }
}
