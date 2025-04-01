import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { contactGuard } from './contact.guard';

describe('contactGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => contactGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
