import { BaseComponent } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { FolderFormComponent, FolderService } from "@folder";
import { CreateItemSelectComponent, TypeEnum, VaultDynamicDrawerService } from "@shared";
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
export class VaultComponent extends BaseComponent {
  public typeEnum = TypeEnum;

  public constructor(
    private authenticationService: AuthenticationService,
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    private changeDetectorRef: ChangeDetectorRef,
    public userDataService: UserDataService,
    private snackBarService: SnackBarService,
    private folderService: FolderService
  ) {
    super();
  }

  public deleteFolder(folderId: string): void {
    this.folderService.delete(folderId)
      .pipe(
        catchError(err => of(this.snackBarService.open(err.error.msg)))
      )
      .subscribe(folderId => {
        this.snackBarService.open("Folder successfully deleted");
        this.userDataService.removeFolder(folderId as string);
      });
  }

  public addItem(): void {
    this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(CreateItemSelectComponent));
    this.vaultDynamicDrawerService.setState(true);
  }
}
