import { Injectable } from "@angular/core";

import { CryptoUtil } from "../utils/crypto.util";

@Injectable({
  providedIn: "root"
})
export class CryptoService {

  public async test(password: string, salt: string): Promise<any> {
    const saltBuffer = CryptoUtil.stringToArrayBuffer(salt);
    const passwordBuffer = CryptoUtil.stringToArrayBuffer(password)

    const pbkdf2Params = {
      iterations: 100000,
      hash: "SHA-256",
      salt: saltBuffer,
      name: "PBKDF2"
    };

    const importKey = await crypto.subtle.importKey("raw", passwordBuffer, { name: "PBKDF2"}, false, ["deriveBits"]);
    console.log(importKey);
    const deriveBits = await crypto.subtle.deriveBits(pbkdf2Params, importKey, 512);
    console.log(deriveBits);
  }
}
