import { EncryptedData } from "../../utils/ecnrypted-data.model";
import { VaulteaCryptoKey } from "../../utils/vaultea-crypto-key.model";

export abstract class CryptoBaseService {
  public abstract encryptData(key: VaulteaCryptoKey, data: ArrayBuffer | string): Promise<EncryptedData>;
  public abstract decryptData(key: VaulteaCryptoKey, data: ArrayBuffer | string): Promise<string>;
  public abstract computePbkdf2(password: string, salt: string, iterations: number): Promise<VaulteaCryptoKey>;
  public abstract hmac(value: ArrayBuffer, key: ArrayBuffer, algorithm: "sha256" | "sha512"): Promise<ArrayBuffer>;
}