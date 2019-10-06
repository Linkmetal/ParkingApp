import { Component, OnInit } from '@angular/core';
import { BasicUser } from './../../typings/user.d';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';




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
    private toastService: ToastService,
    private menuController: MenuController,
    private translateService: TranslateService
    ) {
      translateService.addLangs(['en', 'es']);
      translateService.setDefaultLang(environment.language);
      translateService.use(environment.language);
     }

  ngOnInit() {
    this.menuController.enable(false);
    this.nativeStorage.getItem('user').then( (res) => {
      this.user = res;
      this.loadForm('login.schema');
    }, (err) => {
      console.log(err);
      this.loadForm('login.schema');
    });
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
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
        this.fields[0].fieldGroup.forEach(el => {
          el.expressionProperties = {'templateOptions.label': this.translateService.stream(el.templateOptions.label)};
        });
        console.log(this.fields)
        if(this.user.username !== null) {
          this.model = this.user;
        } else {
          this.model = model;
        }
      }),
    ).subscribe();
  }

  changeLanguague(e) {
    console.log(e);
    this.translateService.setDefaultLang(e.detail.value);
    this.translateService.use(e.detail.value)

  }
}
