import { CryptoFunctionService } from "@abstract";
import { TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";

import { CryptoBusinessLogicService } from "../../../abstract/services/crypto-business-logic.service";
import { UserService } from "../../../abstract/services/user.service";
import { CryptoUtil } from "../../../utils/crypto.util";
import { VaulteaCryptoKey } from "../../../utils/vaultea-crypto-key.model";
import { BrowserCryptoBusinessLogicService } from "../browser-crypto-business-logic.service";
import { BrowserCryptoFunctionService } from "../browser-crypto-function.service";

describe("BrowserCryptoBusinessLogicService", () => {
  let cryptoFunctionService: CryptoFunctionService;
  let browserCryptoBusinessLogicService: CryptoBusinessLogicService;
  let encryptionKey: VaulteaCryptoKey;

  beforeEach(async () => {
    TestBed.configureTestingModule({ 
      imports: [
        BrowserModule
      ],
      providers: [
        { provide: UserService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
      ] 
    });

    cryptoFunctionService = TestBed.inject(CryptoFunctionService);
    browserCryptoBusinessLogicService = TestBed.inject(CryptoBusinessLogicService);
    encryptionKey = await browserCryptoBusinessLogicService.generateEncryptionKey();
  });

  it("should decrypt the encrypted string correctly", async () => {
    const cleartext = "Hello World";
    const encryptedData = await cryptoFunctionService.encryptData(encryptionKey, cleartext);
    expect(encryptedData.dataString === cleartext).toBeFalse();
    const decryptedText = await cryptoFunctionService.decryptData(encryptionKey, encryptedData.dataBuffer);
    expect(cleartext).toBe(decryptedText);
  });

  it("should recreate correct data buffer from encrypted string", async () => {
    const text = "Hello Big World";
    const encryptedData = await cryptoFunctionService.encryptData(encryptionKey, text);
    const computedArrayBuffer = CryptoUtil.stringToArrayBuffer(encryptedData.dataString, true);

    expect(computedArrayBuffer.buffer).toEqual(encryptedData.dataBuffer);
  });

  it("should recreate the correct string from encrypted data's array buffer", async () => {
    const text = "Hello Big World!@!@!!";
    const encryptedData = await cryptoFunctionService.encryptData(encryptionKey, text);
    const computedDataString = CryptoUtil.arrayBufferToBase64(encryptedData.dataBuffer);

    expect(encryptedData.dataString).toBe(computedDataString);
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
    const encryptedObject = await browserCryptoBusinessLogicService.encryptObject(object, encryptionKey);
    const decryptedObject = await browserCryptoBusinessLogicService.decryptObject(encryptedObject, encryptionKey);

    expect(object).toEqual(decryptedObject);
  });

  it("should decrypt object correctly with keysOmitted provided", async () => {
    const object = {
      "catPaws": "2",
      "purrTime": new Date().toString(),
      "catWeight": "30lbs"
    };
    const encryptedObject = await browserCryptoBusinessLogicService.encryptObject(object, encryptionKey, ["purrTime"]);
    expect(object.purrTime).toEqual(encryptedObject.purrTime);
    const decryptedObject = await browserCryptoBusinessLogicService.decryptObject(encryptedObject, encryptionKey, ["purrTime"]);
    expect(object).toEqual(decryptedObject);
  });
});
