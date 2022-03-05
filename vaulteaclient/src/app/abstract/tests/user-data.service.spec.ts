import { CryptoBusinessLogicService, CryptoFunctionService } from "@abstract";
import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "@authentication";
import { UserMockService } from "@mock";
import { BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService } from "@shared";

import { UserDataService } from "../services/user-data.service";
import { UserKeyService } from "../services/user-key.service";

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
