import { Component, OnInit } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/typings/user';
import { ParkingLocation } from 'src/app/typings/location';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { LoginService } from 'src/app/services/login.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
      private router:Router, 
      private profileService: ProfileService, 
      private nativeStorage: NativeStorage,
      private toastService: ToastService,
      private menuController: MenuController
    ){}

  profile: User;
  actualLocation: ParkingLocation;
  username: string;
  loading = true;
  parkedAt: string;

  ngOnInit(): void {
    this.menuController.enable(true);
    this.nativeStorage.getItem('user').then( res => {
      this.username = res.username;
      this.profileService.get(this.username).subscribe( (res) => {
        this.profileService.profile = res;
        console.log(res);
        this.profile = this.profileService.profile;
        this.nativeStorage.setItem('profile', res);
        this.nativeStorage.getItem('location').then(res => {
          this.actualLocation = res;
          console.log(this.actualLocation);
          if(this.actualLocation !== undefined && this.actualLocation !== null) {
            this.parkedAt = new Date(this.actualLocation.timestamp.in).toLocaleString();
          }
          this.loading = false;
        }, (err) => {
          this.toastService.create(`Error getting profile info: ${err.message}`);
        });
      });
    });
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  refreshLocation(e: ParkingLocation) {
    this.actualLocation = e;
    console.log(this.actualLocation);
    if(e !== null) {
      this.parkedAt = new Date(this.actualLocation.timestamp.in).toLocaleString();
    } else {
      this.parkedAt = '';
    }
  }
}
