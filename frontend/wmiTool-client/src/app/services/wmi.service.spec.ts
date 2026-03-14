import { TestBed } from '@angular/core/testing';

import { Wmi } from './wmi';

describe('Wmi', () => {
  let service: Wmi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wmi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
