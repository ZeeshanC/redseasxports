import { TestBed } from '@angular/core/testing';

import { HttpInterService } from './http-inter.service';

describe('HttpInterService', () => {
  let service: HttpInterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
