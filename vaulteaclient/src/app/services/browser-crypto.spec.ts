import { TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { CRYPTO_SERVICE } from "../abstract";
import { USER_SERVICE } from "../abstract/tokens/user-service.token";
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
    const decryptedText = await cryptoService.decryptData(encryptionKey, encryptedData.dataBuffer);
    expect(cleartext).toBe(decryptedText);
  });
});
