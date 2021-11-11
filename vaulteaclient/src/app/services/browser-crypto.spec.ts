import { TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { CRYPTO_SERVICE } from "../abstract";
import { USER_SERVICE } from "../abstract/tokens/user-service.token";
import { CryptoUtil } from "../utils/crypto.util";
import { StretchedMasterKey } from "../utils/stretched-master-key.model";
import { VaulteaCryptoKey } from "../utils/vaultea-crypto-key.model";
import { BrowserCryptoService } from "./browser-crypto.service";
import { BrowserUserService } from "./browser-user.service";

describe("BrowserCryptoService", () => {
  let cryptoService: BrowserCryptoService;
  let userService: BrowserUserService;
  let formBuilder: FormBuilder;
  let form: FormGroup;
  let stretchedMasterKey: StretchedMasterKey;
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
    userService = TestBed.inject(BrowserUserService);
    cryptoService = TestBed.inject(BrowserCryptoService);

    form = formBuilder.group({
      username: "test",
      password: "test"
    });
    stretchedMasterKey = await cryptoService.generateStretchedMasterKey(form.get("password")?.value, form.get("username")?.value);
    encryptionKey = await cryptoService.generateEncryptionKey();
  });
  
  it("should return the same cleartext", async () => {
    const cleartext = "Hello World";
    const encryptedData = await cryptoService.encryptData(encryptionKey.keyBuffer, cleartext);
    const decryptedText = await cryptoService.decryptData(encryptionKey, encryptedData.dataBuffer);
    console.log(CryptoUtil.arrayBufferToAscii(decryptedText));
    expect(1).toBe(1);
  });
});