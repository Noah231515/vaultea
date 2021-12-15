import { BaseComponent, CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";
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
  public isDrawerOpened: boolean = false;
  public drawerPortal: ComponentPortal<any>;
  
  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
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
    this.listenToDrawerState();
    this.listenToPortalState();
    this.changeDetectorRef.markForCheck();
  }

  private listenToDrawerState(): void {
    this.vaultDynamicDrawerService.getIsOpenObservable().subscribe((isOpen: boolean) => {
      this.isDrawerOpened = isOpen;
    })
  }

  private listenToPortalState(): void {
    this.vaultDynamicDrawerService.getPortalStateObservable().subscribe((portal: ComponentPortal<any>) => {
      this.drawerPortal = portal;
    })
  }

  public addItem(): void {
    this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(FolderFormComponent));
    this.vaultDynamicDrawerService.setState(true);
  }

  public closeDrawer(): void {
    this.vaultDynamicDrawerService.setState(false);
  }
}
