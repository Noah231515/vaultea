import { BaseComponent, CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { User } from "@authentication";
import { Folder, FolderFormComponent, FolderService } from "@folder";
import { TypeEnum, VaultDynamicDrawerService } from "@shared";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

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
  public user: User;
  public folders: Folder[] = [];
  public typeEnum = TypeEnum;

  public constructor(
    private authenticationService: AuthenticationService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    private changeDetectorRef: ChangeDetectorRef,
    private userDataService: UserDataService,
    private snackBarService: SnackBarService,
    private folderService: FolderService
  ) {
    super();
  }

  // TODO: Handle data injection maybe?
  public async ngOnInit(): Promise<void> {
    this.initFolders();
    this.listenForFolderChanges();
  }

  private initFolders(): void {
    this.user = this.authenticationService.getLoggedInUser();
  }

  private listenForFolderChanges(): void {
    this.userDataService.folderUpdatedObservable.subscribe(async (folder: Folder) => {
      this.changeDetectorRef.markForCheck();
    });
  }

  public deleteFolder(folderId: string): void {
    this.folderService.delete(folderId)
      .pipe(
        catchError(err => of(this.snackBarService.open(err.error.msg)))
      )
      .subscribe(folderId => {
        this.snackBarService.open("Folder successfully deleted");
        this.userDataService.removeFolder(folderId as string);
        const index = this.folders.findIndex(x => x.id === folderId);
        this.folders.splice(index, 1);
        this.changeDetectorRef.markForCheck();
      });
  }

  public addItem(): void {
    this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(FolderFormComponent));
    this.vaultDynamicDrawerService.setState(true);
  }
}
