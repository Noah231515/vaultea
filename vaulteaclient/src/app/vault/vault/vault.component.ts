import { BaseComponent, CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Folder } from "@folder";

import { AuthenticationService } from "../../authentication/authentication.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-vault",
  styleUrls: ["./vault.component.scss"],
  templateUrl: "./vault.component.html",
})
export class VaultComponent extends BaseComponent implements OnInit {
  public folders: Folder[] = [];
  
  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService
  ) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.authenticationService.getLoggedInUser().folders.forEach(async folder => {
      this.folders.push(await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), ["id", "vault_id_id"]));
    });
    this.changeDetectorRef.markForCheck();
  }
}
