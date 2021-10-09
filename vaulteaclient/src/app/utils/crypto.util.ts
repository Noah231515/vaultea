export class CryptoUtil {

  public static stringToArrayBuffer(string: string): ArrayBuffer {
    // https://stackoverflow.com/questions/30631927/converting-to-base64-in-javascript-without-deprecated-escape-call
    // Helps translate characters outside of utf8 to inside of utf8 to then be converted to ascii
    const cleanedString = unescape(encodeURIComponent(string));
    const bufferView = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
      bufferView[i] = cleanedString.charCodeAt(i);
    }
    return bufferView;
  }

  public static arrayBufferToAscii(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer); // Raw binary data is chunked into bytes, stored as decimal representation
    let result = "";
    for (let i = 0; i < byteArray.length; i++) {
      result += String.fromCharCode(byteArray[i]); // Appends each ascii glyph from raw decimal data
    }
    return btoa(result);
  }

  private buffToString(buff: ArrayBuffer): void {
    
    const intArray = new Uint8Array(buff);
    // console.log("from buff");
    // console.log(
    //   String.fromCharCode.apply(null, intArray as any).toString()
    // );
  }
}