import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clearUrlGuard } from './clear-url.guard';

describe('clearUrlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clearUrlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
