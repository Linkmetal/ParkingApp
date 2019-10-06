import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePage } from './profile.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService, TranslateStore, TranslateModule, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler, USE_DEFAULT_LANG } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { HttpClientModule } from '@angular/common/http';

xdescribe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormlyModule,
        FormlyIonicModule,
        TranslateModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      // providers: [NativeStorage, TranslateService, TranslateStore, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler, InjectionToken(USE_DEFAULT_LANG)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
