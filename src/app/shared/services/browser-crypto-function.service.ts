import { CryptoFunctionService } from "@abstract";
import { CryptoUtil } from "@util";

import { EncryptedData } from "../models/encrypted-data.model";
import { VaulteaCryptoKey } from "../models/vaultea-crypto-key.model";

export class BrowserCryptoFunctionService implements CryptoFunctionService {
  public defaultIterations: number = 100000;

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

  public async hmac(value: ArrayBuffer, key: ArrayBuffer, algorithm: "sha256" | "sha512"): Promise<ArrayBuffer> {
    const signingAlgorithm = {
      name: "HMAC",
      hash: { name: algorithm === "sha256" ? "SHA-256" : "SHA-512" },
    };

    const impKey = await crypto.subtle.importKey("raw", key, signingAlgorithm, false, ["sign"]);
    return await crypto.subtle.sign(signingAlgorithm, impKey, value);
  }

  /**
   * Bitwarden's Implementation of hkdfExpand
   * @param prk
   * @param info
   * @param outputByteSize
   * @param algorithm
   * @returns
   */
  public async hkdfExpand(prk: ArrayBuffer, info: string, outputByteSize: number, algorithm: "sha256" | "sha512"): Promise<ArrayBuffer> {
    const hashLen = algorithm === "sha256" ? 32 : 64;
    if (outputByteSize > 255 * hashLen) {
      throw new Error("outputByteSize is too large.");
    }
    const prkArr = new Uint8Array(prk);
    if (prkArr.length < hashLen) {
      throw new Error("prk is too small.");
    }
    const infoBuf = CryptoUtil.stringToArrayBuffer(info);
    const infoArr = new Uint8Array(infoBuf);
    let runningOkmLength = 0;
    let previousT = new Uint8Array(0);
    const n = Math.ceil(outputByteSize / hashLen);
    const okm = new Uint8Array(n * hashLen);
    for (let i = 0; i < n; i++) {
      const t = new Uint8Array(previousT.length + infoArr.length + 1);
      t.set(previousT);
      t.set(infoArr, previousT.length);
      t.set([i + 1], t.length - 1);
      previousT = new Uint8Array(await this.hmac(t.buffer, prk, algorithm));
      okm.set(previousT, runningOkmLength);
      runningOkmLength += previousT.length;
      if (runningOkmLength >= outputByteSize) {
        break;
      }
    }
    return okm.slice(0, outputByteSize).buffer;
  }
}
