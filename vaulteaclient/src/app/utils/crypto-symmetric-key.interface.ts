export interface CryptoSymmetricKeyInterface {
  encryptionKey: ArrayBuffer;
  macKey: ArrayBuffer;
  stretchedMasterKey: ArrayBuffer;
}
