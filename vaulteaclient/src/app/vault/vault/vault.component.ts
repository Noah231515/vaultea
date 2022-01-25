import { BaseComponent } from "@abstract";
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
  public typeEnum = TypeEnum;
  public folders: Folder[];

  public constructor(
    private authenticationService: AuthenticationService,
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    private changeDetectorRef: ChangeDetectorRef,
    private userDataService: UserDataService,
    private snackBarService: SnackBarService,
    private folderService: FolderService
  ) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.folders = this.userDataService.getFolders();
    this.listenForDataChanges();
  }

  private listenForDataChanges(): void {
    this.userDataService.refreshDataObservable.subscribe(() => this.folders = this.userDataService.getFolders());
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
    this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(FolderFormComponent));
    this.vaultDynamicDrawerService.setState(true);
  }
}
