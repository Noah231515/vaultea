import { VaulteaCryptoKey } from "./vaultea-crypto-key.model";

export class StretchedMasterKey {
  encryptionKey: VaulteaCryptoKey;
  macKey: VaulteaCryptoKey;
  stretchedKey: VaulteaCryptoKey;

  constructor(encryptionKey: VaulteaCryptoKey, macKey: VaulteaCryptoKey, stretchedKey: VaulteaCryptoKey) {
    this.encryptionKey = encryptionKey;
    this.macKey = macKey;
    this.stretchedKey = stretchedKey;
  }
}
