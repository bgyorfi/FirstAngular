import { TestBed } from '@angular/core/testing';

import { PopularFilmsService } from './popular-films.service';

describe('PopularFilmsService', () => {
  let service: PopularFilmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularFilmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
