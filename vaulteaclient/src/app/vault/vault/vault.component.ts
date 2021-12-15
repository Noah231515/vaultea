import { BaseComponent, CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Folder, FolderFormComponent } from "@folder";
import { VaultDynamicDrawerService } from "@shared";

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
    private authenticationService: AuthenticationService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private vaultDynamicDrawerService: VaultDynamicDrawerService
  ) {
    super();
  }

  // TODO: Handle data injection maybe?
  // TODO: Implement close on drawer

  public async ngOnInit(): Promise<void> {
    this.authenticationService.getLoggedInUser().folders.forEach(async folder => {
      this.folders.push(await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), ["id", "vault_id_id"]));
    });

  }


  public addItem(): void {
    this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(FolderFormComponent));
    this.vaultDynamicDrawerService.setState(true);
  }
}
