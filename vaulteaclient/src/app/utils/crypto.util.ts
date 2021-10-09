export class CryptoUtil {

  public static stringToArrayBuffer(string: string): ArrayBuffer {
    const resultBuffer = new ArrayBuffer(string.length * 2);
    const bufferView = new Uint16Array(resultBuffer);
    for (let i = 0; i < string.length; i++) {
      bufferView[i] = string.charCodeAt(i);
    }
    return bufferView;
  }

  public static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const intArray = new Uint8Array(buffer); // Values are converted from binary to bytes to decimal
    console.log(intArray);
    let result = "";
    for (let i = 0; i < intArray.length; i++) {
      result += String.fromCharCode(intArray[i]); // Converts decimal values to utf8
    }
    return btoa(result); // Converts utf8 to base64
  }

  private buffToString(buff: ArrayBuffer): void {
    
    const intArray = new Uint8Array(buff);
    console.log("from buff");
    console.log(
      String.fromCharCode.apply(null, intArray as any).toString()
    );
  }
}