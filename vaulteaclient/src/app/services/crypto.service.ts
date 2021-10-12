import { Injectable } from "@angular/core";

import { CryptoSymmetricKey } from "../utils/crypto-symmetric-key.interface";
import { CryptoUtil } from "../utils/crypto.util";

@Injectable({
  providedIn: "root"
})
export class CryptoService {

  public async generateStretchedMasterKey(password: string, salt: string): Promise<CryptoSymmetricKey> {
    return this.stretchMasterKey(await this.generateMasterKey(password, salt));
  }

  public async generateMasterKey(password: string, salt: string): Promise<ArrayBuffer> {
    const saltBuffer = CryptoUtil.stringToArrayBuffer(salt);
    const passwordBuffer = CryptoUtil.stringToArrayBuffer(password);

    const pbkdf2Params: Pbkdf2Params = {
      hash: "SHA-256",
      iterations: 100000,
      name: "PBKDF2",
      salt: saltBuffer,
    };

    const importKey = await crypto.subtle.importKey("raw", passwordBuffer, { name: "PBKDF2"}, false, ["deriveBits"]);
    return await crypto.subtle.deriveBits(pbkdf2Params, importKey, 256); 
  }

  public async stretchMasterKey(masterKey: ArrayBuffer): Promise<CryptoSymmetricKey> {
    const newKey = new Uint8Array(64);
    const encKey = await CryptoUtil.hkdfExpand(masterKey, "enc", 32, "sha256");
    const macKey = await CryptoUtil.hkdfExpand(masterKey, "mac", 32, "sha256");
    newKey.set(new Uint8Array(encKey));
    newKey.set(new Uint8Array(macKey), 32);
    return {
      encryptionKey: encKey,
      macKey: macKey,
      stretchedMasterKey: newKey
    };
  }
}
