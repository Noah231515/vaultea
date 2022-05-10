import { CryptoFunctionService } from "@abstract";
import { Injectable } from "@angular/core";
import { CryptoUtil } from "@util";

import { CryptoBusinessLogicService } from "../../abstract/services/crypto-business-logic.service";
import { StretchedMasterKey } from "../models/stretched-master-key.model";
import { VaulteaCryptoKey } from "../models/vaultea-crypto-key.model";
import { UserKeyService } from "./user-key.service";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
@Injectable({
  providedIn: "root"
})
export class BrowserCryptoBusinessLogicService implements CryptoBusinessLogicService {

  public constructor(
    private cryptoFunctionService: CryptoFunctionService,
    private userKeyService: UserKeyService,
  ) { }

  public async generateStretchedMasterKey(password: string, salt: string): Promise<StretchedMasterKey> {
    const masterKey = await this.cryptoFunctionService.computePbkdf2(password, salt, this.cryptoFunctionService.defaultIterations);
    return this.stretchMasterKey(masterKey);
  }

  public async stretchMasterKey(masterKey: VaulteaCryptoKey): Promise<StretchedMasterKey> {
    const newKey = new Uint8Array(64);
    const encKey = new VaulteaCryptoKey(await this.cryptoFunctionService.hkdfExpand(masterKey.keyBuffer, "enc", 32, "sha256"));
    const macKey = new VaulteaCryptoKey(await this.cryptoFunctionService.hkdfExpand(masterKey.keyBuffer, "mac", 32, "sha256"));
    newKey.set(new Uint8Array(encKey.keyBuffer));
    newKey.set(new Uint8Array(macKey.keyBuffer), 32);
    return new StretchedMasterKey(encKey, macKey, new VaulteaCryptoKey(newKey));
  }

  public async generateEncryptionKey(): Promise<VaulteaCryptoKey> {
    const newEncryptionKey = new ArrayBuffer(32);
    const encryptionKeyView = new Uint8Array(newEncryptionKey);
    crypto.getRandomValues(encryptionKeyView);
    return new VaulteaCryptoKey(encryptionKeyView.buffer);
  }

  public async encryptObject(object: any, encryptionKey: VaulteaCryptoKey, keysToOmit?: string[]): Promise<any> {
    const keysToEncrypt = Object.keys(object).filter(key => !keysToOmit?.includes(key));
    const result: any = {};

    for (const key of keysToEncrypt) {
      if (typeof object[key] === "object") {
        result[key] = await this.encryptObject(object[key], encryptionKey, keysToOmit);
      } else {
        const encryptedData = await this.cryptoFunctionService.encryptData(encryptionKey, object[key].toString());
        result[key] = encryptedData.dataString;
      }
    }
    this.addOmittedKeysToResult(object, result, keysToOmit);

    return result;
  }

  public async decryptObject(object: any, encryptionKey: VaulteaCryptoKey, keysToOmit?: string[]): Promise<any> {
    const keysToDecrypt = Object.keys(object).filter(key => !keysToOmit?.includes(key));
    const result: any = {};

    for (const key of keysToDecrypt) {
      if(typeof object[key] === "object") {
        result[key] = await this.decryptObject(object[key], encryptionKey, keysToOmit);
      } else {
        const decryptedData = await this.cryptoFunctionService.decryptData(encryptionKey, atob(object[key]));
        result[key] = decryptedData;
      }
    }
    this.addOmittedKeysToResult(object, result, keysToOmit);

    return result;
  }

  private addOmittedKeysToResult(object: any, result: any, keysToOmit?: string[]): void {
    if (keysToOmit) {
      for (const key of keysToOmit) {
        result[key] = object[key];
      }
    }
  }

  public async generateKeys(username: string, password: string): Promise<void> {
    const masterKey = await this.cryptoFunctionService.computePbkdf2(password, username, 1);
    const stretchedMasterKey = await this.generateStretchedMasterKey(password, username);

    this.userKeyService.setMasterKey(masterKey);
    this.userKeyService.setStretchedMasterKey(stretchedMasterKey);
  }

  public async hashPassword(masterKey: VaulteaCryptoKey,  password: string): Promise<string> {
    return (await this.cryptoFunctionService.computePbkdf2(masterKey.keyString, password, 1)).keyString
  }

  public async encryptEncryptionKey(stretchedMasterKey: StretchedMasterKey, encryptionKey: VaulteaCryptoKey): Promise<string> {
    return (await this.cryptoFunctionService.encryptData(stretchedMasterKey.encryptionKey, encryptionKey.keyBuffer)).dataString
  }

  public async decryptEncryptionKey(stretchedMasterKey: StretchedMasterKey, encryptionKey: string): Promise<VaulteaCryptoKey> {
    const keyString =  await this.cryptoFunctionService.decryptData(stretchedMasterKey.encryptionKey, atob(encryptionKey));
    return new VaulteaCryptoKey(
      CryptoUtil.stringToArrayBuffer(keyString)
    );
  }

  public async prepareForSubmit(encryptionKey: VaulteaCryptoKey, object: any, keysToOmit: string[] = []): Promise<any> {
    const encryptedData = await this.encryptObject(object, encryptionKey, keysToOmit);
    return encryptedData;
  }
}
