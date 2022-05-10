import { EncryptedData } from "../models/encrypted-data.model";
import { VaulteaCryptoKey } from "../models/vaultea-crypto-key.model";

export abstract class CryptoFunctionService {
  public defaultIterations: number;
  public abstract encryptData(key: VaulteaCryptoKey, data: ArrayBuffer | string): Promise<EncryptedData>;
  public abstract decryptData(key: VaulteaCryptoKey, data: ArrayBuffer | string): Promise<string>;
  public abstract computePbkdf2(password: string, salt: string, iterations: number): Promise<VaulteaCryptoKey>;
  public abstract hmac(value: ArrayBuffer, key: ArrayBuffer, algorithm: "sha256" | "sha512"): Promise<ArrayBuffer>;
  public abstract hkdfExpand(prk: ArrayBuffer, info: string, outputByteSize: number, algorithm: "sha256" | "sha512"): Promise<ArrayBuffer>;
}
