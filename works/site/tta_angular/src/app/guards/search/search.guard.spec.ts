import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { SearchGuard } from './search.guard';

describe('SearchGuard', () => {
  let guard: SearchGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SearchGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
