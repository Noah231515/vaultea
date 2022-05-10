import { combineLatest, Observable, of, Subscription } from "rxjs";
import { catchError, map, take, tap } from "rxjs/operators";

import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation
} from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Folder, FolderFormComponent, FolderService, FolderStateService } from "@folder";
import { PasswordStateService } from "@password";
import { CreateItemSelectComponent, TypeEnum, UserDataService } from "@shared";
import { BaseComponent, CardData, DialogService } from "@ui-kit";

import {
  PasswordFormComponent
} from "../../../password/components/password-form/password-form.component";
import { PasswordService } from "../../../password/services/password.service";
import { GenericDialogData } from "../../../ui-kit/generic-dialog/generic-dialog-data.interface";
import { SnackBarService } from "../../../ui-kit/services/snack-bar.service";
import { FormStateEnum } from "../../../ui-kit/shared/enums/form-state.enum";
import { VaultItem } from "../../models/vault-item.interface";

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

  public sortableFields: string[] = ["None", "Name"];
  public addMenuItems: TypeEnum[] = [TypeEnum.FOLDER, TypeEnum.PASSWORD];

  public constructor(
    public userDataService: UserDataService,
    private snackBarService: SnackBarService,
    private folderService: FolderService,
    private passwordService: PasswordService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private folderState: FolderStateService,
    private passwordState: PasswordStateService
  ) {
    super();
    this.setEditComponentMap();
    this.routeSubscription = this.route
      .params
      .subscribe(params => {
        this.currentFolderId = params?.id;
        this.folderState.refreshData();
        this.passwordState.refreshData();
      });

    const folderVaultObservable = this.folderState.folderObservable
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

  const passwordVaultObservable = this.passwordState.passwordObservable
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
          return this.sortVaultItems(result)
        })
    );
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentFolder = this.folderState.getFolders().find(x => x.id.toString() === params.id);
    });
  }

  private sortVaultItems(vaultItems: [VaultItem[], VaultItem[]]): VaultItem[] {
    let result: VaultItem[] = [];
    const folderVaultItems: VaultItem[] = vaultItems[0].filter(x => this.currentFolderId ? x.object.folderId?.toString() === this.currentFolderId : !x.object.folderId);
    const passwordVaultItems = vaultItems[1].filter(x => this.currentFolderId ? x.object.folderId?.toString() === this.currentFolderId : !x.object.folderId);
    result = result.concat(folderVaultItems, passwordVaultItems);

    if (this.userDataService.sortByBehaviorSubject.getValue()) {
      result.sort((a, b) => this.compareVaultItems(a,b));
    }

    return result;
  }

  private compareVaultItems(a: VaultItem, b: VaultItem): number {
    const aValue = (a as any).object[this.userDataService.sortByBehaviorSubject.getValue()];
    const bValue = (b as any).object[this.userDataService.sortByBehaviorSubject.getValue()];

    if (typeof(aValue) === "string" && typeof(bValue) === "string") {
      return aValue.localeCompare(bValue);
    }

    return 0;
  }

  public setSortBy(option: string): void {
    this.userDataService.sortByBehaviorSubject.next(option.toLowerCase());
    this.folderState.refreshData();
    this.passwordState.refreshData();
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
              take(1)
            )
            .subscribe(primaryButtonClicked => {
            if (primaryButtonClicked) {
              this.deleteFolder(cardData.object.id);
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
    const dialogData = {existingObject: cardData.object};
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = dialogData;

    this.dialogService.open(this.editComponentMap.get(cardData.type), config);
  }

  public handleContentClicked(cardData: CardData): void {
    switch (cardData.type) {
      case TypeEnum.FOLDER:
        this.router.navigateByUrl(`vault/folder/${cardData.object.id}`);
        break;
      case TypeEnum.PASSWORD: {
        const config: MatDialogConfig = new MatDialogConfig();
        config.data = {
          existingObject: cardData.object,
          formState: FormStateEnum.VIEW
        };

        this.dialogService.open(PasswordFormComponent, config);
        break;
      }
      default:
        break;
    }
  }

  public handleStarClicked(cardData: CardData): void {
    switch (cardData.type) {
      case TypeEnum.FOLDER:
        this.folderService.updateStarred(cardData.object.id)
          .pipe(take(1))
          .subscribe(async folder => {
            this.snackBarService.open(`Folder successfully ${folder.starred ? "starred" : "unstarred"}`);
            await this.folderState.updateFolders(folder, false);
          });
        break;
      case TypeEnum.PASSWORD:
        this.passwordService.updateStarred(cardData.object.id)
          .pipe(take(1))
          .subscribe(async password => {
            this.snackBarService.open(`Password successfully ${password.starred ? "starred" : "unstarred"}`);
            await this.passwordState.updatePasswords(password, false);
          });
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
      .subscribe(response => {
        if (response) {
          this.snackBarService.open("Folder successfully deleted");
          this.folderState.removeFolder(response.id);
        }
      });
  }

  private deletePassword(passwordId: string): void {
    this.passwordService.delete(passwordId)
      .pipe(
        take(1),
        catchError(err => of(this.snackBarService.open(err.error.msg)))
      )
      .subscribe(response => {
        if (response) {
          this.snackBarService.open("Password successfully deleted");
          this.passwordState.removePassword(response.id);
        }
      });
  }

  public addItem(selectedType: TypeEnum): void {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      currentFolderId: this.route.snapshot.params.id,
      selectedType: selectedType
    };
    this.dialogService.open(CreateItemSelectComponent, config);
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  private setEditComponentMap(): void {
    this.editComponentMap.set(TypeEnum.FOLDER, FolderFormComponent);
    this.editComponentMap.set(TypeEnum.PASSWORD, PasswordFormComponent);
  }
}
