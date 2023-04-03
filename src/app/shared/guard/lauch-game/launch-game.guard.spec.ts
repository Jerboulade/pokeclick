import { TestBed } from '@angular/core/testing';

import { LaunchGameGuard } from './launch-game.guard';

describe('LaunchGameGuard', () => {
  let guard: LaunchGameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LaunchGameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
