import { TestBed } from "@angular/core/testing";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";

import { UserPreferenceStateService } from "./user-preference-state.service";

describe("UserPreferenceStateService", () => {
  let service: UserPreferenceStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserKeyService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
      ]
    });
    service = TestBed.inject(UserPreferenceStateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
