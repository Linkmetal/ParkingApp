import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { GoogleMapComponent } from 'src/app/shared/components/google-map/google-map.component';
import { GoogleMaps } from '@ionic-native/google-maps'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
    
  ],
  declarations: [HomePage, GoogleMapComponent],
  providers: [GoogleMaps]
})
export class HomePageModule {}
