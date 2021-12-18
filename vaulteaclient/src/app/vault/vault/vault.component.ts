import { BaseComponent, CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Folder, FolderFormComponent } from "@folder";
import { KeysToOmitConstant, VaultDynamicDrawerService } from "@shared";

import { UserDataService } from "../../abstract/services/user-data.service";
import { AuthenticationService } from "../../authentication/authentication.service";
import { SnackBarService } from "../../ui-kit/services/snack-bar.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    private changeDetectorRef: ChangeDetectorRef,
    private userDataService: UserDataService,
    private snackBarService: SnackBarService
  ) {
    super();
  }

  // TODO: Handle data injection maybe?
  public async ngOnInit(): Promise<void> {
    this.initFolders();
    this.listenForFolderChanges();
  }

  private initFolders(): void {
    this.authenticationService.getLoggedInUser().folders.forEach(async folder => {
      this.folders.push(await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.FOLDER));
      this.changeDetectorRef.markForCheck();
    });
  }

  private listenForFolderChanges(): void {
    this.userDataService.folderUpdatedObservable.subscribe(async (folder: Folder) => {
      if (folder.id) {
        if (this.folders.find(x => x.id === folder.id)) {
          // TODO: Implement replacing folder with updated folder
        } else {
          let newFolder = await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.FOLDER);
          this.folders.push(newFolder);
          this.snackBarService.open(`${newFolder.name} successfully added`);
          newFolder = null;
        }
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  public addItem(): void {
    this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(FolderFormComponent));
    this.vaultDynamicDrawerService.setState(true);
  }
}
