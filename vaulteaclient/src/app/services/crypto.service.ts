import { Injectable } from "@angular/core";

import { Buffer } from "../../../node_modules/buffer";
import { CryptoUtil } from "../utils/crypto.util";
import * as hkdf from "futoin-hkdf";

@Injectable({
  providedIn: "root"
})
export class CryptoService {

  public async generateMasterKey(password: string, salt: string): Promise<string> {
    const saltBuffer = CryptoUtil.stringToArrayBuffer(salt);
    const passwordBuffer = CryptoUtil.stringToArrayBuffer(password);

    const pbkdf2Params: Pbkdf2Params = {
      hash: "SHA-256",
      iterations: 100000,
      name: "PBKDF2",
      salt: saltBuffer,
    };

    const importKey = await crypto.subtle.importKey("raw", passwordBuffer, { name: "PBKDF2"}, false, ["deriveBits"]);
    const derivedBits = await crypto.subtle.deriveBits(pbkdf2Params, importKey, 256);
    return CryptoUtil.arrayBufferToAscii(derivedBits);
  }

  public async stretchMasterKey(masterKey: string): Promise<string> {
    const stretched = hkdf.expand("sha512", hkdf.hash_length("sha512"), masterKey, 64, "");
    console.log(stretched);
    return "";
  }
}
