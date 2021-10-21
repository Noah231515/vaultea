import { VaulteaCryptoKey } from "./vaultea-crypto-key.model";

export class StretchedMasterKey {
  public encryptionKey: VaulteaCryptoKey;
  public macKey: VaulteaCryptoKey;
  public stretchedKey: VaulteaCryptoKey;

  constructor(encryptionKey: VaulteaCryptoKey, macKey: VaulteaCryptoKey, stretchedKey: VaulteaCryptoKey) {
    this.encryptionKey = encryptionKey;
    this.macKey = macKey;
    this.stretchedKey = stretchedKey;
  }
}
