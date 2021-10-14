export interface CryptoSymmetricKey {
  encryptionKey: ArrayBuffer;
  macKey: ArrayBuffer;
  stretchedMasterKey: ArrayBuffer;
}
