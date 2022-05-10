import { CryptoBusinessLogicService, CryptoFunctionService } from "@abstract";
import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "@authentication";
import { UserMockService } from "@mock";

import { UserDataService } from "../../shared/services/user-data.service";
import { BrowserCryptoBusinessLogicService } from "./browser-crypto-business-logic.service";
import { BrowserCryptoFunctionService } from "./browser-crypto-function.service";
import { UserKeyService } from "./user-key.service";

describe("UserDataService", () => {
  let service: UserDataService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: AuthenticationService, useClass: UserMockService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        UserMockService,
        UserDataService,
        UserKeyService,
      ]
    });
    service = TestBed.inject(UserDataService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
