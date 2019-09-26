import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";

export interface FormlyObject {
    form: FormGroup;
    model: any;
    options: FormlyFormOptions;
    fields: FormlyFieldConfig[];
}