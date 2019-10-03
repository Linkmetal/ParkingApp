import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
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

  @Output() coordsSave: EventEmitter<ParkingLocation> = new EventEmitter();

  loading = true;
  username = '';
  actualLocation: ParkingLocation;
  map: GoogleMap = undefined;
  marker: Marker = undefined;
  markerImage: MarkerIcon = {
    url: 'https://icon-library.net/images/google-maps-car-icon/google-maps-car-icon-15.jpg',
    size: {
        width: 50,
        height: 50
    }
  };

  constructor(
    private geolocation: Geolocation,
    private locationService: LocationService,
    private toastService: ToastService,
    private nativeStorage: NativeStorage,
    private loginService: LoginService
  ) { }

  async ngOnInit() {
    this.nativeStorage.getItem('location').then(res => this.actualLocation = res, err => console.log(err));
    this.loadMap();
  }

  loadMap() {
    this.nativeStorage.getItem('user').then( res => this.username = res.username );
    this.geolocation.getCurrentPosition().then( (res) => {
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

      // Carga del marcador de la location sin terminar
      if(this.actualLocation !== null) {
        this.marker = this.map.addMarkerSync({
          title: 'Ionic',
          icon: this.markerImage,
          animation: 'DROP',
          position: {
            lat: this.actualLocation.coords.lat,
            lng: this.actualLocation.coords.long
          }
        });
        this.map.setCameraTarget( this.marker.getPosition());
      }
    });
  }

  saveCoords() {
    this.geolocation.getCurrentPosition().then( (res) => {
      let date = Date.now();
      let location: ParkingLocation = {
        username: this.username,
        timestamp: {
          in: date,
          out: null,
        },
        coords: {
            lat: res.coords.latitude,
            long: res.coords.longitude
        }
      };
      this.locationService.add(location, this.username).subscribe( async (res) => {
        this.toastService.create('Location saved');
        console.log("Product ==>", res);
        this.nativeStorage.setItem('location', res).then(res => this.actualLocation = res, err => this.toastService.create(`Error saving actual location: ${err.message}`));
        this.actualLocation = res;
        this.marker = this.map.addMarkerSync({
          title: 'Your Car',
          icon: this.markerImage,
          animation: 'DROP',
          position: {
            lat: res.coords.lat,
            lng: res.coords.long
          }
        });
        this.map.setCameraTarget( this.marker.getPosition());
        this.coordsSave.emit(this.actualLocation);
      }, (err) => {
        this.toastService.create(err.toString());
      });
    });
  }

  saveExit() {
    let location = this.actualLocation;
    let time = Date.now();
    this.locationService.setExitTime(location._id, time).subscribe( async res => {
      this.toastService.create('Saved!');
      this.actualLocation = null;
      await this.nativeStorage.setItem('location', null);
      this.marker.remove();
      this.coordsSave.emit(this.actualLocation);
    },
    err => {
      this.toastService.create(`Error saving exit time: ${err.message}`);
    });
  }
}
