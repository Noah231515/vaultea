import { StretchedMasterKey, VaulteaCryptoKey } from "@shared";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export abstract class CryptoBusinessLogicService {
  public abstract generateStretchedMasterKey(password: string, salt: string): Promise<StretchedMasterKey>;
  public abstract stretchMasterKey(masterKey: VaulteaCryptoKey): Promise<StretchedMasterKey>;
  public abstract generateEncryptionKey(): Promise<VaulteaCryptoKey>;
  public abstract generateKeys(username: string, password: string): Promise<void>;
  public abstract encryptObject(object: any, encryptionKey: VaulteaCryptoKey, keysToOmit?: string[]): Promise<any>;
  public abstract decryptObject(object: any, encryptionKey: VaulteaCryptoKey, keysToOmit?: string[]): Promise<any>;
  public abstract hashPassword(masterKey: VaulteaCryptoKey, password: string): Promise<string>;
  public abstract encryptEncryptionKey(stretchedMasterKey: StretchedMasterKey, encryptionKey: VaulteaCryptoKey): Promise<string>;
  public abstract decryptEncryptionKey(stretchedMasterKey: StretchedMasterKey, encryptionKey: string): Promise<VaulteaCryptoKey>;
  public abstract prepareForSubmit(encryptionKey: VaulteaCryptoKey, object: any, keysToOmit: string[]): Promise<any>;
}
