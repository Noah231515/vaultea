import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Folder } from "@folder";
import { DataUtil } from "@util";

import { AuthenticationService } from "../../../authentication/authentication.service";
import { BrowserCryptoBusinessLogicService } from "../browser-crypto-business-logic.service";
import { BrowserCryptoFunctionService } from "../browser-crypto-function.service";

describe("DataUtil", () => {
  const childFolder1: Folder = {
    id: "2",
    vaultId: "1",
    name: "Child folder",
    description: "",
    parentFolderId: "1",
    pathNodes: [],
    childFolders: []
  };
  const childFolder2: Folder ={
    id: "3",
    vaultId: "1",
    name: "Child child folder",
    description: "",
    parentFolderId: "2",
    pathNodes: [],
    childFolders: []
  };
  const parentFolder1: Folder = {
    id: "1",
    vaultId: "1",
    name: "First folder",
    description: "",
    parentFolderId: "",
    pathNodes: [],
    childFolders: []
  };
  const parentFolder2: Folder = {
    id: "20",
    vaultId: "1",
    name: "Second folder",
    description: "",
    parentFolderId: "",
    pathNodes: [],
    childFolders: []
  };

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

  it("should transform list of flat folders to nested folders when parents come first in the list", () => {
    const folders = [parentFolder1, parentFolder2, childFolder1, childFolder2];
    DataUtil.transformToNestedState(folders);

    expect(parentFolder1.childFolders).toEqual([childFolder1]);
    expect(parentFolder2.childFolders).toEqual([]);
    expect(childFolder1.childFolders).toEqual([childFolder2]);
    expect(childFolder2.childFolders).toEqual([]);
  });

  it("should transform list of flat folders to nested folders when parents come last in the list", () => {
    const folders = [childFolder1, childFolder2, parentFolder2, parentFolder1];
    DataUtil.transformToNestedState(folders);

    expect(parentFolder1.childFolders).toEqual([childFolder1]);
    expect(parentFolder2.childFolders).toEqual([]);
    expect(childFolder1.childFolders).toEqual([childFolder2]);
    expect(childFolder2.childFolders).toEqual([]);
  });

  it("should get path nodes for child folder", () => {
    const folders = [parentFolder1, parentFolder2, childFolder1, childFolder2];
    const pathNodes = DataUtil.getPathNodes(folders, childFolder2);

    expect(pathNodes).toEqual([childFolder1, parentFolder1]);
  });

  it("should get path nodes for child folder with parents coming last", () => {
    const folders = [childFolder1, childFolder2, parentFolder2, parentFolder1];
    const pathNodes = DataUtil.getPathNodes(folders, childFolder2);

    expect(pathNodes).toEqual([childFolder1, parentFolder1]);
  });
});
