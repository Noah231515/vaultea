import { CryptoUtil } from "./crypto.util";

export class EncryptedData {
  public dataBuffer: ArrayBuffer;
  public dataString: string;

  constructor(encryptedDataBuffer: ArrayBuffer, iv: ArrayBuffer) {
    const newDataBuffer = new Uint8Array(iv.byteLength + encryptedDataBuffer.byteLength);
    newDataBuffer.set(new Uint8Array(iv), 0);
    newDataBuffer.set(new Uint8Array(encryptedDataBuffer), iv.byteLength);

    this.dataBuffer = newDataBuffer;
    this.dataString = CryptoUtil.arrayBufferToAscii(encryptedDataBuffer);
  }
}
