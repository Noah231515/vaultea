import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { CryptoService } from "../abstract/services/crypto.service";
import { UserService } from "../abstract/services/user.service";
import { CryptoUtil } from "../utils/crypto.util";
import { EncryptedData } from "../utils/ecnrypted-data.model";
import { StretchedMasterKey } from "../utils/stretched-master-key.model";
import { VaulteaCryptoKey } from "../utils/vaultea-crypto-key.model";

@Injectable({
  providedIn: "root"
})
export class BrowserCryptoService implements CryptoService {

  public constructor(
    private userService: UserService
  ) { }

  public async generateStretchedMasterKey(password: string, salt: string): Promise<StretchedMasterKey> {
    const masterKey = await this.computePbkdf2(password, salt);
    return this.stretchMasterKey(masterKey);
  }

  public async computePbkdf2(password: string, salt: string, iterations: number = 10000): Promise<VaulteaCryptoKey> {
    const saltBuffer = CryptoUtil.stringToArrayBuffer(salt);
    const passwordBuffer = CryptoUtil.stringToArrayBuffer(password);

    const pbkdf2Params: Pbkdf2Params = {
      hash: "SHA-256",
      iterations: iterations,
      name: "PBKDF2",
      salt: saltBuffer,
    };

    const importKey = await crypto.subtle.importKey("raw", passwordBuffer, { name: "PBKDF2"}, false, ["deriveBits"]);
    return new VaulteaCryptoKey(await crypto.subtle.deriveBits(pbkdf2Params, importKey, 256)); 
  }

  public async stretchMasterKey(masterKey: VaulteaCryptoKey): Promise<StretchedMasterKey> {
    const newKey = new Uint8Array(64);
    const encKey = new VaulteaCryptoKey(await CryptoUtil.hkdfExpand(masterKey.keyBuffer, "enc", 32, "sha256"));
    const macKey = new VaulteaCryptoKey(await CryptoUtil.hkdfExpand(masterKey.keyBuffer, "mac", 32, "sha256"));
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

  public async encryptData(key: VaulteaCryptoKey, data: ArrayBuffer | string): Promise<EncryptedData> {
    const iv = new Uint8Array(16);
    crypto.getRandomValues(iv);

    if (typeof data === "string") {
      data = CryptoUtil.stringToArrayBuffer(data);
    }

    const aesCbCParams: AesCbcParams = {
      iv: iv,
      name: "AES-CBC",
    }

    const importKey = await crypto.subtle.importKey("raw", key.keyBuffer, { name: "AES-CBC"}, false, ["encrypt"]);
    return  new EncryptedData(await crypto.subtle.encrypt(aesCbCParams, importKey, data), iv);
  }

  public async decryptData(key: VaulteaCryptoKey, data: ArrayBuffer | string): Promise<string> {
    if (typeof data === "string") {
      data = (CryptoUtil.stringToArrayBuffer(data) as Uint8Array).buffer;
    }

    const iv = data.slice(0, 16);
    const aesCbCParams: AesCbcParams = {
      iv: iv,
      name: "AES-CBC",
    }

    const importKey = await crypto.subtle.importKey("raw", key.keyBuffer , { name: "AES-CBC"}, false, ["decrypt"]);
    return CryptoUtil.arrayBufferToUtf8(await crypto.subtle.decrypt(aesCbCParams, importKey, data.slice(iv.byteLength)));
  }

  public async encryptObject(object: any, encryptionKey: VaulteaCryptoKey, keysToOmit?: string[]): Promise<any> {
    const keysToEncrypt = Object.keys(object).filter(key => !keysToOmit?.includes(key));
    const result: any = {};

    for (const key of keysToEncrypt) {
      if (typeof object[key] === "object") {
        result[key] = await this.encryptObject(object[key], encryptionKey, keysToOmit);
      } else {
        const encryptedData = await this.encryptData(encryptionKey, object[key].toString());
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
        const decryptedData = await this.decryptData(encryptionKey, atob(object[key]));
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

  public async generateKeys(form: FormGroup): Promise<void> {
    const masterKey = await this.computePbkdf2(form.get("password")?.value, form.get("username")?.value, 1);
    const stretchedMasterKey = await this.generateStretchedMasterKey(form.get("password")?.value, form.get("username")?.value);
    const encryptionKey = await this.generateEncryptionKey();

    this.userService.setMasterKey(masterKey);
    this.userService.setStretchedMasterKey(stretchedMasterKey);
    this.userService.setEncryptionKey(encryptionKey);
  }

  public async hashPassword(password: string): Promise<string> {
    const masterKey = this.userService.getMasterKey()
    return (await this.computePbkdf2(masterKey.keyString, password, 1)).keyString
  }

  public async encryptEncryptionKey(form: FormGroup): Promise<string> {
    const encryptionKey = this.userService.getEncryptionKey();
    const stretchedMasterKey = this.userService.getStretchedMasterKey();
    return (await this.encryptData(stretchedMasterKey.encryptionKey, encryptionKey.keyBuffer)).dataString
  }
}
