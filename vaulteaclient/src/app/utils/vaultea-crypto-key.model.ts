import { CryptoUtil } from "./crypto.util";

export class VaulteaCryptoKey {
  keyBuffer: ArrayBuffer;
  keyString: string;

  public constructor(keyBuffer: ArrayBuffer) {
    this.keyString = CryptoUtil.arrayBufferToAscii(keyBuffer);
    this.keyBuffer = keyBuffer;
  }
}