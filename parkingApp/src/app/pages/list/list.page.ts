import { Component, OnInit } from '@angular/core';
import { ParkingLocation } from 'src/app/typings/location';
import { LocationService } from 'src/app/services/location.service';
import { ToastService } from 'src/app/services/toast.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { GoogleMap, Marker, MarkerIcon, GoogleMaps, GoogleMapOptions } from '@ionic-native/google-maps';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;

  locations: Array<ParkingLocation>;
  displayMap = false;
  map: GoogleMap = undefined;
  marker: Marker = undefined;
  markerImage: MarkerIcon = {
    url: 'https://icon-library.net/images/google-maps-car-icon/google-maps-car-icon-15.jpg',
    size: {
        width: 50,
        height: 50
    }
  };

  constructor(private locationService: LocationService, private toastService: ToastService, private nativeStorage: NativeStorage, private router: Router) {
    
  }

  ngOnInit() {
    let username = '';
    this.nativeStorage.getItem('user').then( res =>{
      username = res.username;
      console.log(username);
      this.locationService.list(username).subscribe( res => {
        this.locations = res.result;
        console.log(this.locations)
      }, err => {
        this.toastService.create(`Error getting the locations history: ${err.message}`);
      });
    });

  }

  getDate(timestamp) {
    return new Date(timestamp.in).toLocaleString();
  }

  getTimeElapsed(timestamp) {
    let elapsedTime = timestamp.out - timestamp.in;

    let ms = elapsedTime % 1000;
    elapsedTime = (elapsedTime - ms) / 1000;
    let secs = elapsedTime % 60;
    elapsedTime = (elapsedTime - secs) / 60;
    let mins = elapsedTime % 60;
    let hrs = (elapsedTime - mins) / 60;


    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  loadMap(ind) {
    let location = this.locations[ind];
    this.displayMap = true;
    const mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: location.coords.lat,
           lng: location.coords.long
         },
         zoom: 18,
         tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: this.markerImage,
      animation: 'DROP',
      position: {
        lat: location.coords.lat,
        lng: location.coords.long
      }
    });
    this.map.setCameraTarget( this.marker.getPosition());

  }

}
