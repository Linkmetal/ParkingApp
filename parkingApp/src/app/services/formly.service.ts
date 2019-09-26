import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { FormGroup } from '@angular/forms';
import { FormlyObject } from '../typings/formly/formly';

@Injectable({
  providedIn: 'root'
})
export class FormlyService {

  constructor(
    private http: HttpClient,
    private formlyJsonschema: FormlyJsonschema
    ) { }

  loadSchema(name: string) {
    let formObj: FormlyObject =  {
      form: null,
      options: null,
      fields: null,
      model: null
    }

    return this.http.get<any>(`assets/schemas/${name}.schema.json`)
    // .pipe(
    //   tap(({ schema, model }) => {
    //     formObj.form = new FormGroup({});
    //     formObj.options = {};
    //     formObj.fields = [this.formlyJsonschema.toFieldConfig(schema)];
    //     formObj.fields[0].fieldGroup[1].templateOptions.type = 'password'
    //     formObj.model = model;
        
    //   }))
  }
}
