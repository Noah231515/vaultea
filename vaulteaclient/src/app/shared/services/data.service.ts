import { CryptoService, UserService } from "@abstract";
import { Injectable } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';

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
    return encryptedData;
  }
}
