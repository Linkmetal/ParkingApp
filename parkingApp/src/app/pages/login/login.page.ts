import { Component, OnInit } from '@angular/core';
import { BasicUser } from './../../typings/user.d';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { LoginService } from './../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastService } from 'src/app/services/toast.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: BasicUser = {
    username: null,
    password: null
  };
  remember = true;
  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];

  constructor(
    private loginService: LoginService,
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient,
    private router: Router,
    private nativeStorage: NativeStorage,
    private profileService: ProfileService,
    private toastService: ToastService
    ) { }

    ngOnInit() {
      this.nativeStorage.getItem('user').then( (res) => {
        this.user = res;
        this.loadForm('login.schema');
      }, (err) => {
        console.log(err);
        this.loadForm('login.schema');
      });
  }


  login(model: BasicUser){
    console.log(model);
    this.loginService.login(model).subscribe( async (res) => {
      console.log(res);
      if(res.token) {
        if(this.remember === true) {
          await this.nativeStorage.setItem('user', model);
          await this.nativeStorage.setItem('token', res.token);
        }
        this.loginService.user = model;
        
          this.router.navigateByUrl('/home')
        
        // this.router.navigateByUrl('/home');

      }
    }, (err) => {
      this.toastService.create(`Error logging in: ${err.message}`);
    });
  };


  loadForm(type: string) {
    this.http.get<any>(`assets/schemas/${type}.json`).pipe(
      tap(({ schema, model }) => {
        this.form = new FormGroup({});
        this.options = {};
        this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
        this.fields[0].fieldGroup[1].templateOptions.type = 'password';
        if(this.user.username !== null) {
          this.model = this.user;
        }
        else {
          this.model = model;
        }
      }),
    ).subscribe();
  }
}
