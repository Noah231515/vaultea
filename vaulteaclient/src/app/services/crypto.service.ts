import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { CryptoUtil } from "../utils/crypto.util";
import { StretchedMasterKey } from "../utils/stretched-master-key.model";
import { VaulteaCryptoKey } from "../utils/vaultea-crypto-key.model";

@Injectable({
  providedIn: "root"
})
export class CryptoService {

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

  public async encryptData(key: ArrayBuffer, data: ArrayBuffer | string): Promise<ArrayBuffer> {
    const iv = new Uint8Array(16);
    crypto.getRandomValues(iv);

    if (typeof data === "string") {
      data = CryptoUtil.stringToArrayBuffer(data);
    }

    const aesCbCParams: AesCbcParams = {
      iv: iv,
      name: "AES-CBC",
    }

    const importKey = await crypto.subtle.importKey("raw", key , { name: "AES-CBC"}, false, ["encrypt"]);
    return crypto.subtle.encrypt(aesCbCParams, importKey, data);
  }

  public async decryptData(key: VaulteaCryptoKey, data: ArrayBuffer): Promise<any> {
    const iv = new Uint8Array(16);
    crypto.getRandomValues(iv);

    const aesCbCParams: AesCbcParams = {
      iv: iv,
      name: "AES-CBC",
    }

    const importKey = await crypto.subtle.importKey("raw", key.keyBuffer , { name: "AES-CBC"}, false, ["decrypt"]);
    return crypto.subtle.decrypt(aesCbCParams, importKey, data);
  }

  public encryptForm(form: FormGroup, encryptionKey: ArrayBuffer, keysToOmit?: string[]): any {
    const formKeys = Object.keys(form.getRawValue()).filter(key => !keysToOmit?.includes(key));
    formKeys.forEach(async key => {
      const encryptedData = await this.encryptData(encryptionKey , form.get(key)?.value);
      form.get(key)?.setValue(CryptoUtil.arrayBufferToAscii(encryptedData));
    });
  }
}
