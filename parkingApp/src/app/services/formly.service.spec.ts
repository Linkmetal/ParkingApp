import { TestBed } from '@angular/core/testing';

import { FormlyService } from './formly.service';

xdescribe('FormlyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormlyService = TestBed.get(FormlyService);
    expect(service).toBeTruthy();
  });
});
