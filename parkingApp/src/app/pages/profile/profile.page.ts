import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { User } from 'src/app/typings/user';
import { LoginService } from '../../services/login.service';
import { FormlyService } from '../../services/formly.service';
import { FormlyObject } from '../../typings/formly/formly';
import { tap } from 'rxjs/operators';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastService } from 'src/app/services/toast.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  editting = false;
  loaded = false;
  profile: User;
  editIcon = 'create';
  formlyObj: FormlyObject = {
    form: null,
    model: null,
    options: null,
    fields: null
  }
  

  constructor(
    private profileService: ProfileService,
    private formlyService: FormlyService,
    private formlyJsonschema: FormlyJsonschema,
    private toastService: ToastService,
    private nativeStorage: NativeStorage,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.nativeStorage.getItem('profile').then( res => {
      this.profile = res;
      this.formlyService.loadSchema('profile').pipe(
      tap(({ schema, model }) => {
        this.formlyObj.form = new FormGroup({});
        this.formlyObj.options = {};
        this.formlyObj.fields = [this.formlyJsonschema.toFieldConfig(schema)];
        this.formlyObj.fields[0].fieldGroup.forEach(el => {
          el.expressionProperties = {'templateOptions.label': this.translateService.stream(el.templateOptions.label)};
        });
        this.formlyObj.model = this.profile || model;
        this.loaded = true;
      })).subscribe();
    });
  }

  update(model: User) {
    this.profileService.set(model).subscribe( (res) => {
      console.log(res);
      this.toastService.create('Saved!')
    }, (err) => {
      this.toastService.create(err.message)
    })
  }
}
