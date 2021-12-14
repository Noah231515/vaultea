import { BaseComponent, CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Folder } from "@folder";
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
  public isDrawerOpened: boolean = false;
  
  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private vaultDynamicDrawerService: VaultDynamicDrawerService
  ) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.authenticationService.getLoggedInUser().folders.forEach(async folder => {
      this.folders.push(await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), ["id", "vault_id_id"]));
    });
    this.listenToDrawerState();
    this.changeDetectorRef.markForCheck();
  }

  private listenToDrawerState(): void {
    this.vaultDynamicDrawerService.getIsOpenObservable().subscribe((isOpen: boolean) => {
      this.isDrawerOpened = isOpen;
    })
  }

  public addItem(): void {
    this.vaultDynamicDrawerService.setState(true);
  }
}
