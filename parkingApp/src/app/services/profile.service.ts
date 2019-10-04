import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../typings/user';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile: any;

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders()
  .set('Content-Type', 'application/json');

  get(username: string): Observable<any> {
    return this.http.get(`${environment.profileServer}/Users?username=${username}`, {headers: this.headers} );
  }

  set(user: User, username: string): Observable<any> {
    return this.http.put(`${environment.profileServer}/Users/${user.id}`, {user} );
  }

  add(user: User): Observable<any> {
    return this.http.post(`´${environment.profileServer}/Users/add`, {user} );
  }
}