import { TestBed } from '@angular/core/testing';

import { ContexteService } from './contexte.service';

describe('ContexteService', () => {
  let service: ContexteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContexteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
