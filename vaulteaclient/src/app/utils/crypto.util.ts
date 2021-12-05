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

  public static arrayBufferToBase64(buffer: ArrayBuffer): string {
    return btoa(this.arrayBufferToUtf8(buffer));
  }
}