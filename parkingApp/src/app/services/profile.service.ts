import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../typings/user';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  serverUrl: 'https://parkingmvc.azurewebsites.net/api/';
  profile: any;

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders()
  .set('Content-Type', 'application/json');

  get(username: string): Observable<any> {
    return this.http.get(`https://parkingmvc.azurewebsites.net/api/Users?username=${username}`, {headers: this.headers} );
  }

  set(user: User, username: string): Observable<any> {
    return this.http.put(`https://parkingmvc.azurewebsites.net/api/Users/${user.id}`, {user} );
  }

  add(user: User): Observable<any> {
    return this.http.post(`https://parkingmvc.azurewebsites.net/api/Users/add`, {user} );
  }
}