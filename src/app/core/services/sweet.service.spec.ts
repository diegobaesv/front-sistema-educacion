import { TestBed } from '@angular/core/testing';

import { SweetService } from './sweet.service';

describe('SweetService', () => {
  let service: SweetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
