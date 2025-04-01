import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { contactRedirectGuard } from './contact-redirect.guard';

describe('contactRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => contactRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
