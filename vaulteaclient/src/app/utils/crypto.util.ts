export class CryptoUtil {

  public static stringToArrayBuffer(string: string): ArrayBuffer {
    const resultBuffer = new ArrayBuffer(string.length * 2);
    const bufferView = new Uint16Array(resultBuffer);
    for (let i = 0; i < string.length; i++) {
      bufferView[i] = string.charCodeAt(i);
    }
    return bufferView;
  }
}