import { Injectable } from "@angular/core";

import { CryptoUtil } from "../utils/crypto.util";

@Injectable({
  providedIn: "root"
})
export class CryptoService {

  public async test(password: string, salt: string): Promise<any> {
    const saltBuffer = CryptoUtil.stringToArrayBuffer(salt);
    const passwordBuffer = CryptoUtil.stringToArrayBuffer(password);
    this.buffToString(saltBuffer);


    const pbkdf2Params = {
      iterations: 100000,
      hash: "SHA-256",
      salt: saltBuffer,
      name: "PBKDF2"
    };

    const importKey = await crypto.subtle.importKey("raw", passwordBuffer, { name: "PBKDF2"}, false, ["deriveBits"]);
    console.log(importKey);
    const derivedBits = await crypto.subtle.deriveBits(pbkdf2Params, importKey, 256);
    this.arrayBufferToBase64(derivedBits);
  }
  
  private buffToString(buff: ArrayBuffer): void {
    
    const intArray = new Uint8Array(buff);
    console.log("from buff");
    console.log(
      String.fromCharCode.apply(null, intArray as any).toString()
    );
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): void {
    const intArray = new Uint8Array(buffer); // Values are converted from binary to bytes to decimal
    let result = "";
    for (let i = 0; i < intArray.length; i++) {
      console.log(intArray[i]);
      result += String.fromCharCode(intArray[i]); // Converts decimal values to utf8
    }
    console.log(result);
    console.log(btoa(result)); // Converts utf8 to base64

  }
}
