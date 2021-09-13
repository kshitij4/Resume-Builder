import { TestBed } from '@angular/core/testing';

import { ResetPassResolverGuard } from './reset-pass-resolver.guard';

describe('ResetPassResolverGuard', () => {
  let guard: ResetPassResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResetPassResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
