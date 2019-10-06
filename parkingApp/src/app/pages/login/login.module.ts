import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';


import { HttpClientModule } from '@angular/common/http';

import { FormlyIonicModule } from '@ngx-formly/ionic';

import { FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormlyModule,
    FormlyIonicModule,
    HttpClientModule,
    TranslateModule.forChild(),
    
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
