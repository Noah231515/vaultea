import { StretchedMasterKey } from "../utils/stretched-master-key.model";
import { VaulteaCryptoKey } from "../utils/vaultea-crypto-key.model";

export interface UserService {
  masterKey: VaulteaCryptoKey;
  stretchedMasterKey: StretchedMasterKey;
  encryptionKey: VaulteaCryptoKey;

  getMasterKey(): VaulteaCryptoKey;
  getStretchedMasterKey(): StretchedMasterKey;
  getEncryptionKey(): VaulteaCryptoKey;
  setMasterKey(masterKey: VaulteaCryptoKey): void;
  setStretchedMasterKey(stretchedMasterKey: StretchedMasterKey): void;
  setEncryptionKey(encryptionKey: VaulteaCryptoKey): void;
}
