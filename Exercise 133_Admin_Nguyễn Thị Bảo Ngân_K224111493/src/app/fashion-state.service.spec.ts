import { TestBed } from '@angular/core/testing';

import { FashionStateService } from './fashion-state.service';

describe('FashionStateService', () => {
  let service: FashionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FashionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
