import { Injectable } from "@angular/core";

import { StretchedMasterKey } from "../utils/stretched-master-key.model";
import { VaulteaCryptoKey } from "../utils/vaultea-crypto-key.model";
import { UserService } from "./user-service";

@Injectable({
  providedIn: "root"
})
export class BrowserUserService implements UserService {
  masterKey: VaulteaCryptoKey;
  stretchedMasterKey: StretchedMasterKey;
  encryptionKey: VaulteaCryptoKey;

  public getMasterKey(): VaulteaCryptoKey {
    return this.masterKey;
  }

  public getStretchedMasterKey(): StretchedMasterKey {
    return this.stretchedMasterKey;
  }

  public getEncryptionKey(): VaulteaCryptoKey {
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
