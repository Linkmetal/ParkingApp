import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MarkerIcon
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from 'src/app/services/location.service';
import { ParkingLocation } from 'src/app/typings/location';
import { ToastService } from 'src/app/services/toast.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  loading = true;
  markerImage: MarkerIcon = {
    url: "https://icon-library.net/images/google-maps-car-icon/google-maps-car-icon-15.jpg",
    size: {
        width: 50,
        height: 50
    }
  }
  map: GoogleMap = undefined;


  constructor(private geolocation: Geolocation, private locationService: LocationService, private toastService: ToastService, private nativeStorage: NativeStorage, private loginService: LoginService) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    let username = this.loginService.user.username;
    this.locationService.list(username).subscribe( (res) => {
      console.log(res.result[res.result.length - 1])
      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: res.result[res.result.length - 1].coords.lat,
             lng: res.result[res.result.length - 1].coords.long
           },
           zoom: 18,
           tilt: 30
        }
      };
      this.map = GoogleMaps.create('map_canvas', mapOptions);
      this.loading = false;
      let marker: Marker = this.map.addMarkerSync({
        title: 'Ionic',
        icon: this.markerImage,
        animation: 'DROP',
        position: {
          lat: res.result[res.result.length - 1].coords.lat,
          lng: res.result[res.result.length - 1].coords.long
        }
      });
      this.map.setCameraTarget( marker.getPosition());
    });
  }

  saveCoords() {
    let username = this.loginService.user.username;
    this.geolocation.getCurrentPosition().then( (res) => {
      let date = Date.now();
      let location: ParkingLocation = {
        timeStamp: date,
        coords: {
            lat: res.coords.latitude,
            long: res.coords.longitude
        }
      }
      this.locationService.add(location, username).subscribe( (res) => {
        this.toastService.create('Saved');
      }, (err) => {
        this.toastService.create(err.toString());
      })
      let marker: Marker = this.map.addMarkerSync({
        title: 'Your Car',
        icon: this.markerImage,
        animation: 'DROP',
        position: {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
      });
      this.map.setCameraTarget( marker.getPosition());
    });
  }
}
