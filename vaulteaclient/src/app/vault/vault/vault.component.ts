import { combineLatest, Observable, of, Subscription } from "rxjs";
import { catchError, map, take, tap } from "rxjs/operators";
import { EditData } from "src/app/shared/models/edit-data.interface";

import { BaseComponent } from "@abstract";
import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation
} from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Folder, FolderFormComponent, FolderService } from "@folder";
import { CreateItemSelectComponent, TypeEnum } from "@shared";
import { CardData, DialogService } from "@ui-kit";

import { UserDataService } from "../../abstract/services/user-data.service";
import {
  PasswordFormComponent
} from "../../password/components/password-form/password-form.component";
import { PasswordService } from "../../password/services/password.service";
import { GenericDialogData } from "../../ui-kit/generic-dialog/generic-dialog-data.interface";
import { SnackBarService } from "../../ui-kit/services/snack-bar.service";
import { VaultItem } from "../models/vault-item.interface";

/* eslint-disable indent */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-vault",
  styleUrls: ["./vault.component.scss"],
  templateUrl: "./vault.component.html",
})
export class VaultComponent extends BaseComponent implements OnInit, OnDestroy {
  public typeEnum = TypeEnum;
  public currentFolder?: Folder;
  public vaultItemsObservable: Observable<VaultItem[]>;
  public currentFolderId: string;
  public routeSubscription: Subscription;

  public editComponentMap: Map<TypeEnum, any> = new Map();
  public vaultItems: VaultItem[] = [];

  public constructor(
    public userDataService: UserDataService,
    private snackBarService: SnackBarService,
    private folderService: FolderService,
    private passwordService: PasswordService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
    this.setEditComponentMap();
    this.routeSubscription = this.route
      .params
      .subscribe(params => {
        this.currentFolderId = params?.id;
        this.userDataService.refreshData();
      });

    const folderVaultObservable = this.userDataService.folderObservable
    .pipe(
      map(folders => {
        return folders.map(folder => {
          const vaultItem: VaultItem = {
            object: folder,
            itemType: TypeEnum.FOLDER
          }
          return vaultItem;
        })
      })
    );

  const passwordVaultObservable = this.userDataService.passwordObservable
    .pipe(
      map(passwords => {
        return passwords.map(password => {
          const vaultItem: VaultItem = {
            object: password,
            itemType: TypeEnum.PASSWORD
          }
          return vaultItem;
        })
      })
    );

    this.vaultItemsObservable = combineLatest([folderVaultObservable, passwordVaultObservable])
    .pipe(
        tap((result: [VaultItem[], VaultItem[]]) => {
          this.vaultItems = [].concat(result[0], result[1]);
        }),
        map(result => {
          return [].concat(
            result[0].filter(x => this.currentFolderId ? x.object.folderId?.toString() === this.currentFolderId : !x.object.folderId),
            result[1].filter(x => this.currentFolderId ? x.object.folderId?.toString() === this.currentFolderId : !x.object.folderId)
          );
        })
    );
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentFolder = this.userDataService.getFolders().find(x => x.id.toString() === params.id);
    });
  }

  private getDeleteModalData(cardData: CardData): GenericDialogData {
    return {
      headerText: "Delete Folder and Contents",
      text: `${cardData.object.name} contains other items.
      Are you sure you want to delete ${cardData.object.name} and all of its contents?
      This data cannot be recovered.`,
      primaryButton: this.BUTTONS_CONSTANT.DELETE_BUTTON_DANGER,
      secondaryButton: this.BUTTONS_CONSTANT.CANCEL_BUTTON
    };
  }

  public handleDelete(cardData: CardData): void {
    switch (cardData.type) {
      case TypeEnum.FOLDER:
        if (this.vaultItems.some(i => i.object.folderId === cardData.object.id)) {
          this.dialogService.openWarning(this.getDeleteModalData(cardData))
            .afterClosed()
            .pipe(
              take(1
            ))
            .subscribe(primaryButtonClicked => {
            if (primaryButtonClicked) {
              alert("primaryClicked");
            } else {
              alert("secondaryCliced")
            }
          });
        } else {
          this.deleteFolder(cardData.object.id);
        }
        break;
      case TypeEnum.PASSWORD:
        this.deletePassword(cardData.object.id);
        break;
      default:
        break;
    }
  }

  public openModalInEditMode(cardData: CardData): void {
    const editData: EditData = {existingObject: cardData.object};
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = editData;

    this.dialogService.open(this.editComponentMap.get(cardData.type), config);
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
        take(1),
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
        take(1),
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
    this.dialogService.open(CreateItemSelectComponent)
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  private setEditComponentMap(): void {
    this.editComponentMap.set(TypeEnum.FOLDER, FolderFormComponent);
    this.editComponentMap.set(TypeEnum.PASSWORD, PasswordFormComponent);
  }
}
