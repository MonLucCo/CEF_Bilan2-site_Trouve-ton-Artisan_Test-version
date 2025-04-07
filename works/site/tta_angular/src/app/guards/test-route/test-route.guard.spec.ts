import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { testRouteGuard } from './test-route.guard';

describe('testRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => testRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
