import { CryptoUtil } from "@util";

export class EncryptedData {
  public dataBuffer: ArrayBuffer;
  public dataString: string;

  constructor(encryptedDataBuffer: ArrayBuffer, iv: ArrayBuffer) {
    const newDataBuffer = new Uint8Array(iv.byteLength + encryptedDataBuffer.byteLength);
    newDataBuffer.set(new Uint8Array(iv), 0);
    newDataBuffer.set(new Uint8Array(encryptedDataBuffer), iv.byteLength);

    this.dataBuffer = newDataBuffer.buffer;
    this.dataString = btoa(CryptoUtil.arrayBufferToUtf8(newDataBuffer));
  }
}
