import { FormGroup } from "@angular/forms";

import { EncryptedData } from "../utils/ecnrypted-data.model";
import { StretchedMasterKey } from "../utils/stretched-master-key.model";
import { VaulteaCryptoKey } from "../utils/vaultea-crypto-key.model";

export interface CryptoService {
  generateStretchedMasterKey(password: string, salt: string): Promise<StretchedMasterKey>;
  computePbkdf2(password: string, salt: string, iterations: number): Promise<VaulteaCryptoKey>;
  stretchMasterKey(masterKey: VaulteaCryptoKey): Promise<StretchedMasterKey>;
  generateEncryptionKey(): Promise<VaulteaCryptoKey>;
  generateKeys(form: FormGroup): Promise<void>;
  encryptData(key: ArrayBuffer, data: ArrayBuffer | string): Promise<EncryptedData>
  decryptData(key: VaulteaCryptoKey, data: ArrayBuffer): Promise<any>;
  encryptForm(form: FormGroup, encryptionKey: VaulteaCryptoKey, keysToOmit?: string[]): Promise<any>;
}