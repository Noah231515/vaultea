import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { CryptoUtil } from "@util";

import { VaulteaCryptoKey } from "../../models/vaultea-crypto-key.model";
import { BrowserCryptoBusinessLogicService } from "../browser-crypto-business-logic.service";
import { BrowserCryptoFunctionService } from "../browser-crypto-function.service";

describe("BrowserCryptoFunctionService", () => {
  const username: string = "test";
  const password: string = "test1";
  const bufferView: Uint8Array = new Uint8Array([
    87,243,245,95,150,64,85,185,128,200,208,109,38,168,153,111,
    124,195,151,114,140,71,76,76,78,107,247,207,214,173,128,186
  ]);
  const cryptoKey: VaulteaCryptoKey = new VaulteaCryptoKey(bufferView);

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
    userKeyService.setEncryptionKey(cryptoKey);
  });

  it("should decrypt the encrypted string correctly", async () => {
    const cleartext = "Hello World";
    const encryptedData = await cryptoFunctionService.encryptData(userKeyService.getEncryptionKey(), cleartext);
    expect(encryptedData.dataString === cleartext).toBeFalse();
    const decryptedText = await cryptoFunctionService.decryptData(userKeyService.getEncryptionKey(), encryptedData.dataBuffer);
    expect(cleartext).toBe(decryptedText);
  });

  it("should recreate correct data buffer from encrypted string", async () => {
    const text = "Hello Big World";
    const encryptedData = await cryptoFunctionService.encryptData(userKeyService.getEncryptionKey(), text);
    const computedArrayBuffer = CryptoUtil.stringToArrayBuffer(encryptedData.dataString, true);

    expect(computedArrayBuffer.buffer).toEqual(encryptedData.dataBuffer);
  });

  it("should recreate the correct string from encrypted data's array buffer", async () => {
    const text = "Hello Big World!@!@!!";
    const encryptedData = await cryptoFunctionService.encryptData(userKeyService.getEncryptionKey(), text);
    const computedDataString = CryptoUtil.arrayBufferToBase64(encryptedData.dataBuffer);

    expect(encryptedData.dataString).toBe(computedDataString);
  });

  it("should compute pbkdf2 correctly", async () => {
    const computedKey = await cryptoFunctionService.computePbkdf2(password, username, 1);

    expect(btoa(computedKey.keyString)).toEqual("MfKEL38HuEvsQvwUCg2K9Kvxss4VVPuDPkg8G+Ij1vw=");
  });

  it("should compute hmac correctly", async () => {
    const message = "message";
    const computedHmac = await cryptoFunctionService.hmac(CryptoUtil.stringToArrayBuffer(message), cryptoKey.keyBuffer, "sha256");

    expect(btoa(CryptoUtil.arrayBufferToUtf8(computedHmac))).toEqual("UaJuk29dJzaKUzY/6OuG0evDg9xuNIZXDXPcsxKCxAk=");
  });

  it("should compute hmac correctly with sha 256", async () => {
    const message = "message";
    const computedHmac = await cryptoFunctionService.hmac(CryptoUtil.stringToArrayBuffer(message), cryptoKey.keyBuffer, "sha256");

    expect(btoa(CryptoUtil.arrayBufferToUtf8(computedHmac))).toEqual("UaJuk29dJzaKUzY/6OuG0evDg9xuNIZXDXPcsxKCxAk=");
  });

  // it("should compute hmac correctly with sha 512", async () => { TODO: Revisit
  //   const message = "message";
  //   const computedHmac = await cryptoFunctionService.hmac(CryptoUtil.stringToArrayBuffer(message), cryptoKey.keyBuffer, "sha256");

  //   expect(btoa(CryptoUtil.arrayBufferToUtf8(computedHmac))).toEqual("UaJuk29dJzaKUzY/6OuG0evDg9xuNIZXDXPcsxKCxAk=");
  // });
});
