import { TestBed } from '@angular/core/testing';

import { VaultStateService } from './vault-state.service';

describe('VaultStateService', () => {
  let service: VaultStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaultStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
