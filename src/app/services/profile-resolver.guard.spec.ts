import { TestBed } from '@angular/core/testing';

import { ProfileResolverGuard } from './profile-resolver.guard';

describe('ProfileResolverGuard', () => {
  let guard: ProfileResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
