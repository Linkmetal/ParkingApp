import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { BasicUser, User } from '../typings/user';
import { Observable, from, of } from 'rxjs';
import { delay, concatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user: BasicUser
  token = ''


  constructor(private http: HttpClient) { }

  login(user: BasicUser): Observable<any> {
    console.log(user);
    const myArray = [{token: '123456'}];

    return from(myArray).pipe(
            concatMap( item => of(item).pipe( delay( 1000 ) ).pipe(tap((token: any) => {
              this.token = token
              console.log(this.token)
            }))));

    // return this.http.post('...', {user: user} ).pipe()
  }

  register(user: User): Observable<any> {
    console.log(user);
    const myArray = [{token: '123456'}];

    return from(myArray).pipe(
            concatMap( item => of(item).pipe( delay( 1000 ) ).pipe(tap((token: any) => {
              this.token = token
              console.log(this.token)
            }))));

    // return this.http.post('...', {user: user} ).pipe()
  }
}
