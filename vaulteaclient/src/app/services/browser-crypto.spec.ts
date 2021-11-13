import { TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { CRYPTO_SERVICE } from "../abstract";
import { USER_SERVICE } from "../abstract/tokens/user-service.token";
import { CryptoUtil } from "../utils/crypto.util";
import { VaulteaCryptoKey } from "../utils/vaultea-crypto-key.model";
import { BrowserCryptoService } from "./browser-crypto.service";
import { BrowserUserService } from "./browser-user.service";

describe("BrowserCryptoService", () => {
  let cryptoService: BrowserCryptoService;
  let formBuilder: FormBuilder;
  let form: FormGroup;
  let encryptionKey: VaulteaCryptoKey;

  beforeEach(async () => {
    TestBed.configureTestingModule({ 
      imports: [
        BrowserModule
      ],
      providers: [
        FormBuilder,
        {provide: USER_SERVICE, useClass: BrowserUserService},
        {provide: CRYPTO_SERVICE, useClass: BrowserCryptoService},
      ] 
    });
    formBuilder = TestBed.inject(FormBuilder);
    cryptoService = TestBed.inject(BrowserCryptoService);

    form = formBuilder.group({
      username: "test user",
      password: "testPassword!@#%457~+939"
    });
    encryptionKey = await cryptoService.generateEncryptionKey();
  });

  it("should decrypt the encrypted string correctly", async () => {
    const cleartext = "Hello World";
    const encryptedData = await cryptoService.encryptData(encryptionKey, cleartext);
    expect(encryptedData.dataString === cleartext).toBeFalse();
    const decryptedText = await cryptoService.decryptData(encryptionKey, encryptedData.dataBuffer);
    expect(cleartext).toBe(decryptedText);
  });

  it("should recreate correct data buffer from encrypted string", async () => {
    const text = "Hello Big World";
    const encryptedData = await cryptoService.encryptData(encryptionKey, text);
    const computedArrayBuffer = CryptoUtil.stringToArrayBuffer(encryptedData.dataString, true);

    expect(computedArrayBuffer.buffer).toEqual(encryptedData.dataBuffer);
  });

  it("should recreate the correct string from encrypted data's array buffer", async () => {
    const text = "Hello Big World!@!@!!";
    const encryptedData = await cryptoService.encryptData(encryptionKey, text);
    const computedDataString = CryptoUtil.arrayBufferToBase64(encryptedData.dataBuffer);

    expect(2).toBe(1);
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
    const encryptedObject = await cryptoService.encryptObject(object, encryptionKey);
    const decryptedObject = await cryptoService.decryptObject(encryptedObject, encryptionKey);

    expect(object).toEqual(decryptedObject);
  });
});
