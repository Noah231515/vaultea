import { StretchedMasterKey } from "../../utils/stretched-master-key.model";
import { VaulteaCryptoKey } from "../../utils/vaultea-crypto-key.model";

export abstract class UserService {
  private masterKey: VaulteaCryptoKey;
  private stretchedMasterKey: StretchedMasterKey;
  private encryptionKey: VaulteaCryptoKey;

  public getMasterKey(): VaulteaCryptoKey {
    return this.masterKey
  }

  public getStretchedMasterKey(): StretchedMasterKey {
    return this.stretchedMasterKey;
  }

  public  getEncryptionKey(): VaulteaCryptoKey {
    return this.encryptionKey;
  }

  public setMasterKey(masterKey: VaulteaCryptoKey): void {
    this.masterKey = masterKey;
  }

  public setStretchedMasterKey(stretchedMasterKey: StretchedMasterKey): void {
    this.stretchedMasterKey = stretchedMasterKey;
  }

  public setEncryptionKey(encryptionKey: VaulteaCryptoKey): void {
    this.encryptionKey = encryptionKey;
  }
}
