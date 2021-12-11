import { BaseComponent, CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Folder } from "@folder";
import { VaulteaCryptoKey } from "@shared";
import { CryptoUtil } from "@util";

import { AuthenticationService } from "../../authentication/authentication.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-vault",
  styleUrls: ["./vault.component.scss"],
  templateUrl: "./vault.component.html",
})
export class VaultComponent extends BaseComponent implements OnInit {
  public folders?: Folder[];
  private encryptionKey: VaulteaCryptoKey;
  
  public constructor(
    private authenticationService: AuthenticationService,
    private cryptoFunctionService: CryptoFunctionService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.cryptoFunctionService.decryptData(this.userKeyService.getStretchedMasterKey().encryptionKey, this.authenticationService.getLoggedInUser().key).then(decryptedData => {
      this.encryptionKey = new VaulteaCryptoKey(CryptoUtil.stringToArrayBuffer(decryptedData));

      this.folders = this.authenticationService.getLoggedInUser()?.folders;
      this.folders.map(async x => await this.cryptoBusinessLogicService.decryptObject(x, this.encryptionKey, ["id", "vault_id_id"]));

    });
  }
}
