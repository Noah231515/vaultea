import { TestBed } from "@angular/core/testing";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";

import { PasswordStateService } from "./password-state.service";

describe('PasswordStateService', () => {
  let service: PasswordStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserKeyService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
      ]
    });
    service = TestBed.inject(PasswordStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
