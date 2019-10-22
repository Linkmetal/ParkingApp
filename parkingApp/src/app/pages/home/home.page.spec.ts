import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { GoogleMaps } from '@ionic-native/google-maps';
import { GoogleMapComponent } from 'src/app/shared/components/google-map/google-map.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, GoogleMapComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        TranslateModule.forChild(),
        HttpClientModule,
      ],
      providers: [GoogleMaps, NativeStorage, TranslateService, TranslateStore]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
