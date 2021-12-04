import { CryptoService, UserService } from "@abstract";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AuthenticationService } from "../../authentication/authentication.service";

@Injectable({
  providedIn: "root"
})
export class DataService {

  constructor(
    private cryptoService: CryptoService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) { }

  public async prepareForSubmit(object: any, provideVaultId: boolean = false, keysToOmit: string[] = []): Promise<any> {
    const encryptedData = await this.cryptoService.encryptObject(object, this.userService.getEncryptionKey(), keysToOmit);
    if (provideVaultId) {
      encryptedData["vaultId"] = this.authenticationService.getLoggedInUser()?.vaultId;
    }
    this.objectKeysToSnakeCase(encryptedData);
    return encryptedData;
  }
  
  public camelCaseToSnakeCase(string: string): string {
    if (string.match(/[A-Z]/g)) {
      return string.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
    return string;
  }

  public objectKeysToSnakeCase(object: any): void {
    Object.keys(object).forEach(key => {
      const camelCase = this.camelCaseToSnakeCase(key);
      if (camelCase != key) {
        object[this.camelCaseToSnakeCase(key)] = object[key];
        delete object[key];
      }
    });
  }
}
