import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParkingLocation } from '../typings/location';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient, private nativeStorage: NativeStorage) { }


  private headers = new HttpHeaders()
  .set("Content-Type", "application/json")


  list(username: string): Observable<any> {
    return this.http.post(`${environment.server}/locations/list`, {username}, {headers: this.headers} );
  }

  add(coords: ParkingLocation, username: string): Observable<any> {
    return this.http.post(`${environment.server}/locations/add`, {coords, username} );
  }

  setExitTime(id: string, time: number) {
    return this.http.post(`${environment.server}/locations/saveExitTime`, {id, time} );
  }
}
