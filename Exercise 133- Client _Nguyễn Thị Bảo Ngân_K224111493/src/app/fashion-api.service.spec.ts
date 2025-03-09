import { TestBed } from '@angular/core/testing';

import { FashionAPIService } from './fashion-api.service';

describe('FashionAPIService', () => {
  let service: FashionAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FashionAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
