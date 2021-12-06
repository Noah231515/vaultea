import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { DataUtil } from "@util";

import { AuthenticationService } from "../../../authentication/authentication.service";
import { BrowserCryptoBusinessLogicService } from "../browser-crypto-business-logic.service";
import { BrowserCryptoFunctionService } from "../browser-crypto-function.service";

describe("DataUtil", () => {

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

  it("should convert camel case string to snake case", () => {
    const string = "camelCaseString";
    const result = "camel_case_string";
    const computedResult = DataUtil.camelCaseToSnakeCase(string);
    
    expect(result).toBe(computedResult);
  });

  it("should return the original string since it is not camel case", () => {
    const string = "not a camel case string";
    const computedResult = DataUtil.camelCaseToSnakeCase(string);
    
    expect(string).toBe(computedResult);
  });

  it("should convert snake case string to camel case", () => {
    const string = "camel_case_string";
    const result = "camelCaseString";
    const computedResult = DataUtil.snakeCaseToCamelCase(string);
    
    expect(result).toBe(computedResult);
  });

  it("should return the original string since it is not camel case", () => {
    const string = "notASnakeCaseString";
    const computedResult = DataUtil.snakeCaseToCamelCase(string);
    
    expect(string).toBe(computedResult);
  });
});
