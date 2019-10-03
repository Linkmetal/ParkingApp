import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/typings/user';
import { LoginService } from './../../services/login.service';
import { FormlyService } from './../../services/formly.service';
import { FormlyObject } from '../../typings/formly/formly';
import { tap } from 'rxjs/operators';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formlyObj:FormlyObject = {
    form: null,
    model: null,
    options: null,
    fields: null
  }


  constructor(
    private loginService: LoginService,
    private formlyService: FormlyService,
    private formlyJsonschema:FormlyJsonschema
  ) { }

  ngOnInit() {
    this.formlyService.loadSchema('register').pipe(
      tap(({ schema, model }) => {
        this.formlyObj.form = new FormGroup({});
        this.formlyObj.options = {};
        this.formlyObj.fields = [this.formlyJsonschema.toFieldConfig(schema)];
        this.formlyObj.fields[0].fieldGroup[1].templateOptions.type = 'password'
        this.formlyObj.model = model;
      })).subscribe();
  }

  register(model: User) {
    this.loginService.register(model).subscribe( (res) => {
      console.log(res);
    })
  }
}
