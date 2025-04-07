import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { artisansGuard } from './artisans.guard';

describe('artisansGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => artisansGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
