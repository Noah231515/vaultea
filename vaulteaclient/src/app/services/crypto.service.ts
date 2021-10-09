import { Injectable } from "@angular/core";

import { CryptoUtil } from "../utils/crypto.util";

@Injectable({
  providedIn: "root"
})
export class CryptoService {

  public async generateMasterKey(password: string, salt: string): Promise<string> {
    const saltBuffer = CryptoUtil.stringToArrayBuffer(salt);
    const passwordBuffer = CryptoUtil.stringToArrayBuffer(password);
    console.log(password);
    console.log(salt);

    const pbkdf2Params: Pbkdf2Params = {
      hash: "SHA-256",
      iterations: 100000,
      name: "PBKDF2",
      salt: saltBuffer,
    };

    const importKey = await crypto.subtle.importKey("raw", passwordBuffer, { name: "PBKDF2"}, false, ["deriveBits"]);
    const derivedBits = await crypto.subtle.deriveBits(pbkdf2Params, importKey, 256);
    return CryptoUtil.arrayBufferToBase64(derivedBits);
  }

  public async stretchMasterKey(masterKey: string, salt: string): Promise<string> {
    return "";
  }
}
