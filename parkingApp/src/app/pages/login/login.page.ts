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
    ) { 
      this.loadForm('login.schema'); 
    }

  
  
  ngOnInit() {
  }
  
  
  login(model: BasicUser){
    console.log(model);
    this.loginService.login(model).subscribe( (res) => {
      console.log(res);
      if(res.token) {
        this.nativeStorage.setItem("user", model);
        this.loginService.user = model;
        this.nativeStorage.setItem("token", res.token);
        this.profileService.get(this.loginService.user.username).subscribe( (res) => {
          this.profileService.profile = res[0];
          console.log(res);
          this.router.navigateByUrl('/home')
        }, (err) => {
          this.toastService.create("Invalid credentials");
        });
      }
    }, (err) => {
      this.toastService.create("Invalid credentials");
    }) 
  };


  loadForm(type: string) {
    this.http.get<any>(`assets/schemas/${type}.json`).pipe(
      tap(({ schema, model }) => {
        this.form = new FormGroup({});
        this.options = {};
        console.log(schema)
        this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
        console.log(this.fields)
        this.fields[0].fieldGroup[1].templateOptions.type = 'password';
        this.model = model;
      }),
    ).subscribe();
  }
}
