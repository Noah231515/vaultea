import { CryptoUtil } from "./crypto.util";

export class VaulteaCryptoKey {
  public keyBuffer: ArrayBuffer;
  public keyString: string;

  public constructor(keyBuffer: ArrayBuffer) {
    this.keyString = CryptoUtil.arrayBufferToAscii(keyBuffer);
    this.keyBuffer = keyBuffer;
  }
}
