import { Inject } from "@angular/core";

import { StretchedMasterKey } from "../models/stretched-master-key.model";
import { VaulteaCryptoKey } from "../models/vaultea-crypto-key.model";

@Inject({
  providedIn: "root"
})
export class UserKeyService {
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
