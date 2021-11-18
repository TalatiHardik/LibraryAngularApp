import { TestBed } from '@angular/core/testing';

import { ReturnbookService } from './returnbook.service';

describe('ReturnbookService', () => {
  let service: ReturnbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
