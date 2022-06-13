import { TestBed } from '@angular/core/testing';

import { UserPreferenceStateService } from './user-preference-state.service';

describe('UserPreferenceStateService', () => {
  let service: UserPreferenceStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPreferenceStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
