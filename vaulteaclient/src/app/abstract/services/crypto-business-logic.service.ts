import { FormGroup } from "@angular/forms";

import { EncryptedData } from "../../utils/ecnrypted-data.model";
import { StretchedMasterKey } from "../../utils/stretched-master-key.model";
import { VaulteaCryptoKey } from "../../utils/vaultea-crypto-key.model";

export abstract class CryptoBusinessLogicService {
  public abstract generateStretchedMasterKey(password: string, salt: string): Promise<StretchedMasterKey>;
  public abstract computePbkdf2(password: string, salt: string, iterations: number): Promise<VaulteaCryptoKey>;
  public abstract stretchMasterKey(masterKey: VaulteaCryptoKey): Promise<StretchedMasterKey>;
  public abstract generateEncryptionKey(): Promise<VaulteaCryptoKey>;
  public abstract generateKeys(form: FormGroup): Promise<void>;
  public abstract encryptData(key:  VaulteaCryptoKey, data: ArrayBuffer | string): Promise<EncryptedData>
  public abstract decryptData(key: VaulteaCryptoKey, data: ArrayBuffer | string): Promise<string>;
  public abstract encryptObject(object: any, encryptionKey: VaulteaCryptoKey, keysToOmit?: string[]): Promise<any>;
  public abstract decryptObject(object: any, encryptionKey: VaulteaCryptoKey, keysToOmit?: string[]): Promise<any>;
  public abstract hashPassword(password: string): Promise<string>;
  public abstract encryptEncryptionKey(form: FormGroup): Promise<string>;
}
