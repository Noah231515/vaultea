import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";

import { BrowserCryptoBusinessLogicService } from "../browser-crypto-business-logic.service";
import { BrowserCryptoFunctionService } from "../browser-crypto-function.service";

describe("BrowserCryptoBusinessLogicService", () => {
  const username: string = "test";
  const password: string = "test1"

  let cryptoFunctionService: CryptoFunctionService;
  let cryptoBusinessLogicService: CryptoBusinessLogicService;
  let userKeyService: UserKeyService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule
      ],
      providers: [
        { provide: UserKeyService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
      ]
    });

    userKeyService = TestBed.inject(UserKeyService);
    cryptoFunctionService = TestBed.inject(CryptoFunctionService);
    cryptoBusinessLogicService = TestBed.inject(CryptoBusinessLogicService);
    await cryptoBusinessLogicService.generateKeys(username, password);
    userKeyService.setEncryptionKey(await cryptoBusinessLogicService.generateEncryptionKey());
  });

  it("should decrypt encryption key correctly", async () => {
    const encryptionKey = Object.assign({}, userKeyService.getEncryptionKey());
    const encryptedEncryptionKey = await cryptoBusinessLogicService.encryptEncryptionKey(userKeyService.getStretchedMasterKey(), encryptionKey);
    const decryptedEncryptionKey = await cryptoBusinessLogicService.decryptEncryptionKey(userKeyService.getStretchedMasterKey(), encryptedEncryptionKey);

    expect(encryptionKey.keyString).toEqual(decryptedEncryptionKey.keyString);
    expect(btoa(encryptionKey.keyString)).toEqual(btoa(decryptedEncryptionKey.keyString));
  });

  it("should decrypt object correctly", async () => {
    const object = {
      "note": "this is an object note",
      "field": "field",
      "cost": "1821381",
      "date": new Date().toString(),
      "nestedObject": {
        "color": "blue",
        "smell": "good",
        "anotherObject": {
          "shape": "triangle",
          "size": "large",
          "yetAnotherObject": {
            "favoritePizza": "hawaiian",
            "favoriteCrust": "butterGarlic"
          }
        }
      }
    };
    const encryptedObject = await cryptoBusinessLogicService.encryptObject(object, userKeyService.getEncryptionKey());
    const decryptedObject = await cryptoBusinessLogicService.decryptObject(encryptedObject, userKeyService.getEncryptionKey());

    expect(object).toEqual(decryptedObject);
  });

  it("should decrypt object correctly with keysOmitted provided", async () => {
    const object = {
      "catPaws": "2",
      "purrTime": new Date().toString(),
      "catWeight": "30lbs"
    };
    const encryptedObject = await cryptoBusinessLogicService.encryptObject(object, userKeyService.getEncryptionKey(), ["purrTime"]);
    expect(object.purrTime).toEqual(encryptedObject.purrTime);
    const decryptedObject = await cryptoBusinessLogicService.decryptObject(encryptedObject, userKeyService.getEncryptionKey(), ["purrTime"]);
    expect(object).toEqual(decryptedObject);
  });
});
