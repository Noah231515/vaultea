import { TestBed } from "@angular/core/testing";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";

import { FolderStateService } from "./folder-state.service";

describe("FolderStateService", () => {
  let service: FolderStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserKeyService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
      ]
    });
    service = TestBed.inject(FolderStateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
