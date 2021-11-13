export class CryptoUtil {
 
  public static stringToArrayBuffer(string: string, isBase64?: boolean): Uint8Array {
    // https://stackoverflow.com/questions/30631927/converting-to-base64-in-javascript-without-deprecated-escape-call
    // Helps translate characters outside of utf8 to inside of utf8 to then be converted to ascii
    // const cleanedString = unescape(encodeURIComponent(string));

    string = isBase64 ? atob(string) : string;
    const bufferView = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
      bufferView[i] = string.charCodeAt(i);
    }
    return bufferView;
  }

  public static arrayBufferToUtf8(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer); // Raw binary data is chunked into bytes, stored as decimal representation
    let result = "";
    for (let i = 0; i < byteArray.length; i++) {
      result += String.fromCharCode(byteArray[i]); // Appends each ascii glyph from raw decimal data
    }
    return result;
  }

  /**
   * Bitwarden's Implementation of hkdfExpand
   * @param prk 
   * @param info 
   * @param outputByteSize 
   * @param algorithm 
   * @returns 
   */
  public static async hkdfExpand(prk: ArrayBuffer, info: string, outputByteSize: number,
    algorithm: "sha256" | "sha512"): Promise<ArrayBuffer> {
    const hashLen = algorithm === "sha256" ? 32 : 64;
    if (outputByteSize > 255 * hashLen) {
      throw new Error("outputByteSize is too large.");
    }
    const prkArr = new Uint8Array(prk);
    if (prkArr.length < hashLen) {
      throw new Error("prk is too small.");
    }
    const infoBuf = this.stringToArrayBuffer(info);
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

  public static async hmac(value: ArrayBuffer, key: ArrayBuffer, algorithm: "sha256" | "sha512"): Promise<ArrayBuffer> {
    const signingAlgorithm = {
      name: "HMAC",
      hash: { name: algorithm === "sha256" ? "SHA-256" : "SHA-512" },
    };

    const impKey = await crypto.subtle.importKey("raw", key, signingAlgorithm, false, ["sign"]);
    return await crypto.subtle.sign(signingAlgorithm, impKey, value);
  }
}