import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "@authentication";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";
import { Folder } from "@folder";
import { DataUtil } from "@util";

describe("DataUtil", () => {
  let parentFolder1: Folder;
  let parentFolder2: Folder;
  let childFolder1: Folder;
  let childFolder2: Folder;

  beforeEach(async () => {
    childFolder1 = {
      id: "2",
      name: "Child folder",
      description: "",
      folderId: "1",
      pathNodes: [],
      childFolders: [],
      starred: false
    };
    childFolder2 = {
      id: "3",
      name: "Child child folder",
      description: "",
      folderId: "2",
      pathNodes: [],
      childFolders: [],
      starred: false
    };
    parentFolder1 = {
      id: "1",
      name: "First folder",
      description: "",
      folderId: "",
      pathNodes: [],
      childFolders: [],
      starred: false
    };
    parentFolder2 = {
      id: "20",
      name: "Second folder",
      description: "",
      folderId: "",
      pathNodes: [],
      childFolders: [],
      starred: false
    };
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

  it("should get path nodes for child folder", () => {
    const folders = [parentFolder1, parentFolder2, childFolder1, childFolder2];
    DataUtil.setPathNodes(folders);


    expect(parentFolder1.pathNodes).toEqual([]);
    expect(parentFolder2.pathNodes).toEqual([]);
    expect(childFolder1.pathNodes).toEqual([parentFolder1]);
    expect(childFolder2.pathNodes).toEqual([parentFolder1, childFolder1]);
  });

  it("should get the correct path name for a root level folder", () => {
    const path = DataUtil.buildPathString(parentFolder1);
    expect(path).toEqual(`Vault/${parentFolder1.name}`);
  });

  it("should get the correct path name for a nested folder", () => {
    const folders = [parentFolder1, parentFolder2, childFolder1, childFolder2];
    DataUtil.setPathNodes(folders);
    const path = DataUtil.buildPathString(childFolder2);
    expect(path).toEqual(`Vault/${parentFolder1.name}/${childFolder1.name}/${childFolder2.name}`);
  });
});
