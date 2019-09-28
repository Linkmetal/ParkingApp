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
    private router: Router
    ) { 
      this.loadExample('login.schema'); 
    }

  
  
  ngOnInit() {
  }
  
  
  login(model: BasicUser){
    console.log(model);
    this.loginService.login(model).subscribe( (res) => {
      console.log(res);
      if(res.token) {
        this.router.navigateByUrl('/home')
      }
    }, (err) => console.log(err)) 
  };


  loadExample(type: string) {
    this.http.get<any>(`assets/schemas/${type}.json`).pipe(
      tap(({ schema, model }) => {
        this.form = new FormGroup({});
        this.options = {};
        console.log(schema)
        this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
        console.log(this.fields)
        this.fields[0].fieldGroup[1].templateOptions.type = 'password'
        this.model = model;
      }),
    ).subscribe();
  }
}
