import { CryptoUtil } from "./crypto.util";

export class EncryptedData {
  public dataBuffer: ArrayBuffer;
  public dataString: string;

  constructor(dataBuffer: ArrayBuffer) {
    this.dataBuffer = dataBuffer;
    this.dataString = CryptoUtil.arrayBufferToAscii(dataBuffer);
  }
}