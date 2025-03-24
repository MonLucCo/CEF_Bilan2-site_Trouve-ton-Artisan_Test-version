import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { searchGuard } from './search.guard';

describe('searchGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => searchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
