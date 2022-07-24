import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "@authentication";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";

import { PasswordUtil } from "./password.util";

describe("PasswordUtil", () => {


  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        UserKeyService,
        AuthenticationService,
        HttpClient,
        HttpHandler,
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
      ]
    });
  });

  it("should compute the correct entropy", () => {
    const firstSet = "abcde".split("");
    const secondSet = "12345".split("");
    const sets = [firstSet, secondSet];
    const passwordLength = 10;

    expect(PasswordUtil.computePasswordEntropy(sets, passwordLength)).toBe(33);
  });

  it("should compute the correct entropy", () => {
    const firstSet = "abcde".split("");
    const secondSet = "12345".split("");
    const sets = [firstSet, secondSet];
    const passwordLength = 0;

    expect(PasswordUtil.computePasswordEntropy(sets, passwordLength)).toBe(0);
  });
});
