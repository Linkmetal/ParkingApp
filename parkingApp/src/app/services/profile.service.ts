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
    return this.http.get(`http://parkingmvc.azurewebsites.net/api/Users?username=${username}`, {headers: this.headers} );
  }

  set(user: User, username: string): Observable<any> {
    return this.http.put(`http://parkingmvc.azurewebsites.net/api/Users/?username=${username}`, {user} );
  }

  add(user: User): Observable<any> {
    return this.http.put(`http://parkingmvc.azurewebsites.net/api/Users/add`, {user} );
  }
}