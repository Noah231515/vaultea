import { TestBed } from "@angular/core/testing";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";

import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        UserKeyService
      ]
    });
    service = TestBed.inject(UserService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
