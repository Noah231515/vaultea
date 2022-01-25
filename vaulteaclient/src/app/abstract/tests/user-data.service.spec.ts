import { CryptoBusinessLogicService, CryptoFunctionService } from "@abstract";
import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "@authentication";
import { AuthenticationMockService } from "@mock";
import { BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService } from "@shared";
import { DataUtil } from "@util";

import { UserDataService } from "../services/user-data.service";
import { UserKeyService } from "../services/user-key.service";

describe("UserDataService", () => {

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationMockService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        AuthenticationMockService,
        UserDataService,
        UserKeyService,
      ]
    });
  });

  it("should flatten nested folders", () => {
    const userDataService = TestBed.inject(UserDataService);
    const authenticationService = TestBed.inject(AuthenticationMockService);

    authenticationService.resetPathNodesAndChildren();

    const user = authenticationService.getLoggedInUser();

    const initialFolders = Array.from(authenticationService.folders);
    user.folders = DataUtil.transformToNestedState(authenticationService.folders);
    const flatFolders = userDataService.getFlatFolders();

    expect(user.folders).not.toEqual(initialFolders);
    expect(flatFolders).toEqual(initialFolders);
  });
});
