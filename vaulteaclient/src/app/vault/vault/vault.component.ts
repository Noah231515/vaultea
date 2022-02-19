import { BaseComponent } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Folder, FolderService } from "@folder";
import { CreateItemSelectComponent, TypeEnum, VaultDynamicDrawerService } from "@shared";
import { CardData } from "@ui-kit";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

import { UserDataService } from "../../abstract/services/user-data.service";
import { PasswordService } from "../../password/services/password.service";
import { SnackBarService } from "../../ui-kit/services/snack-bar.service";

/* eslint-disable indent */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-vault",
  styleUrls: ["./vault.component.scss"],
  templateUrl: "./vault.component.html",
})
export class VaultComponent extends BaseComponent implements OnInit {
  public typeEnum = TypeEnum;
  public currentFolder?: Folder;

  public constructor(
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    public userDataService: UserDataService,
    private snackBarService: SnackBarService,
    private folderService: FolderService,
    private passwordService: PasswordService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentFolder = this.userDataService.getFolders().find(x => x.id.toString() === params.id);
    })
  }

  public handleDelete(cardData: CardData): void {
    switch (cardData.type) {
      case TypeEnum.FOLDER:
        this.deleteFolder(cardData.object.id);
        break;
      case TypeEnum.PASSWORD:
        this.deletePassword(cardData.object.id);
        break;
      default:
        break;
    }
  }

  public handleContentClicked(cardData: CardData): void {
    switch (cardData.type) {
      case TypeEnum.FOLDER:
        this.router.navigateByUrl(`vault/folder/${cardData.object.id}`);
        break;

      default:
        break;
    }
  }

  private deleteFolder(folderId: string): void {
    this.folderService.delete(folderId)
      .pipe(
        catchError(err => of(this.snackBarService.open(err.error.msg)))
      )
      .subscribe(folderId => {
        this.snackBarService.open("Folder successfully deleted");
        this.userDataService.removeFolder(folderId as string);
      });
  }

  private deletePassword(passwordId: string): void {
    this.passwordService.delete(passwordId)
      .pipe(
        catchError(err => of(this.snackBarService.open(err.error.msg)))
      )
      .subscribe(passwordId => {
        if (passwordId) {
          this.snackBarService.open("Password successfully deleted");
          this.userDataService.removePassword(passwordId as string);
        }
      });
  }

  public addItem(): void {
    this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(CreateItemSelectComponent));
    this.vaultDynamicDrawerService.setState(true);
  }
}
