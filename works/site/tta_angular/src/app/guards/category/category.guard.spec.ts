import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { CategoryGuard } from './category.guard';

describe('CategoryGuard', () => {
  let guard: CategoryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CategoryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});