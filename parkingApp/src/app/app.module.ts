import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyIonicModule} from '@ngx-formly/ionic'
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ObjectTypeComponent } from './typings/formly/object.type';
import { FormlyFieldFile } from './typings/formly/file.type';
import { FileValueAccessor } from './typings/formly/file-value-accessor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ObjectTypeComponent,
    FileValueAccessor,
    FormlyFieldFile,

  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      types: [
        { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },
      ],
    }),
    FormlyIonicModule,
    HttpClientModule  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginService,
    HttpInterceptorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}