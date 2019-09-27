import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
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


  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((res) => {
      console.log(res);
      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: res.coords.latitude,
             lng: res.coords.longitude
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
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
      });
    }).catch((error) => {
       console.log('Error getting location', error);
    });
  }

  saveCoords() {

  }
}
