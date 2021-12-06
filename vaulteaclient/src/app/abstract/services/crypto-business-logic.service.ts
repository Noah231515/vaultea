import { FormGroup } from "@angular/forms";
import { StretchedMasterKey, VaulteaCryptoKey } from "@shared";

export abstract class CryptoBusinessLogicService {
  public abstract generateStretchedMasterKey(password: string, salt: string): Promise<StretchedMasterKey>;
  public abstract stretchMasterKey(masterKey: VaulteaCryptoKey): Promise<StretchedMasterKey>;
  public abstract generateEncryptionKey(): Promise<VaulteaCryptoKey>;
  public abstract generateKeys(form: FormGroup): Promise<void>;
  public abstract encryptObject(object: any, encryptionKey: VaulteaCryptoKey, keysToOmit?: string[]): Promise<any>;
  public abstract decryptObject(object: any, encryptionKey: VaulteaCryptoKey, keysToOmit?: string[]): Promise<any>;
  public abstract hashPassword(password: string): Promise<string>;
  public abstract encryptEncryptionKey(form: FormGroup): Promise<string>;
}
