import { combineLatest, Observable, of, Subscription } from "rxjs";
import { catchError, map, shareReplay, take, tap } from "rxjs/operators";
import { UserPreferencesService } from "src/app/shared/services/user-preferences.service";

import { ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  Folder, FolderFormComponent, FolderService, FolderStateService, FolderUtil
} from "@folder";
import { Password, PasswordStateService, PasswordUtil } from "@password";
import {
  CreateItemSelectComponent, getBaseMatDialogConfig, TypeEnum, UserDataService
} from "@shared";
import { BaseComponent, CardData, DialogService, ItemIconEnum } from "@ui-kit";
import { UserPreferenceStateService } from "@userPreferences";

import {
  PasswordFormComponent
} from "../../../password/components/password-form/password-form.component";
import { PasswordService } from "../../../password/services/password.service";
import { GenericDialogData } from "../../../ui-kit/generic-dialog/generic-dialog-data.interface";
import { SnackBarService } from "../../../ui-kit/services/snack-bar.service";
import { VaultView } from "../../../user-preferences/enums/vault-view.enum";
import { VaultItem } from "../../models/vault-item.interface";
import { UrlStateService } from "../../services/url-state.service";

/* eslint-disable indent */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-vault",
  styleUrls: ["./vault.component.scss"],
  templateUrl: "./vault.component.html",
})
export class VaultComponent extends BaseComponent implements OnDestroy {
  public typeEnum = TypeEnum;
  public currentFolder?: Folder;
  public vaultItemsObservable: Observable<VaultItem[]>;
  public currentFolderId: string;

  public routeSubscription: Subscription;
  public urlSubscription: Subscription;

  public editComponentMap: Map<TypeEnum, any> = new Map();
  public vaultItems: VaultItem[] = [];

  public sortableFields: string[] = ["None", "Name"];
  public addMenuItems: TypeEnum[] = [TypeEnum.FOLDER, TypeEnum.PASSWORD];

  public vaultView = VaultView;

  public constructor(
    public userDataService: UserDataService,
    private snackBarService: SnackBarService,
    private folderService: FolderService,
    private folderUtil: FolderUtil,
    private passwordService: PasswordService,
    private passwordUtil: PasswordUtil,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private folderState: FolderStateService,
    private passwordState: PasswordStateService,
    private urlState: UrlStateService,
    private userPreferencesService: UserPreferencesService,
    public userPreferenceStateService: UserPreferenceStateService
  ) {
    super();
    this.setEditComponentMap();
    this.urlSubscription = this.route.url.subscribe(url => {
      this.urlState.next(url);
    });
    this.routeSubscription = this.route
      .params
      .subscribe(params => {
        this.currentFolderId = params?.id;
        this.currentFolder = this.folderState.getFolders().find(x => x.id.toString() === params.id);
        this.folderState.refreshData();
        this.passwordState.refreshData();
      });

    const folderVaultObservable = this.folderState.folderObservable
    .pipe(
      map(folders => {
        return folders.map(folder => {
          const vaultItem: VaultItem = {
            object: folder,
            itemType: TypeEnum.FOLDER,
            icon: ItemIconEnum.FOLDER,
            type: TypeEnum.FOLDER
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
            itemType: TypeEnum.PASSWORD,
            icon: ItemIconEnum.PASSWORD,
            type: TypeEnum.PASSWORD
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
        }),
        shareReplay()
    );
  }

  private sortVaultItems(vaultItems: [VaultItem[], VaultItem[]]): VaultItem[] {
    let result: VaultItem[] = [];
    let folderVaultItems = vaultItems[0];
    let passwordVaultItems = vaultItems[1];
    
    if (this.route.snapshot.url.toString().includes("starred")) {
      result = result.concat(folderVaultItems, passwordVaultItems);
      result = result.filter(items => items.object.starred === true);
      this.applySort(result);
      return result;
    }

    folderVaultItems = folderVaultItems.filter(x => this.currentFolderId ? x.object.folderId?.toString() === this.currentFolderId : !x.object.folderId);
    passwordVaultItems = passwordVaultItems.filter(x => this.currentFolderId ? x.object.folderId?.toString() === this.currentFolderId : !x.object.folderId);
    
    if (this.userDataService.sortByBehaviorSubject.getValue()) {
      result = result.concat(folderVaultItems, passwordVaultItems);
      this.applySort(result);
    }

    return result;
  }

  private applySort(result: VaultItem[]): VaultItem[] {
    return result.sort((a, b) => this.compareVaultItems(a,b));
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

  private getDeleteModalData(item: CardData | VaultItem): GenericDialogData {
    return {
      headerText: "Delete Folder and Contents",
      text: `${item.object.name} contains other items.
      Are you sure you want to delete ${item.object.name} and all of its contents?
      This data cannot be recovered.`,
      primaryButton: this.BUTTONS_CONSTANT.DELETE_BUTTON_DANGER,
      secondaryButton: this.BUTTONS_CONSTANT.CANCEL_BUTTON
    };
  }

  public handleDelete(item: CardData | VaultItem): void {
    switch (item.type) {
      case TypeEnum.FOLDER:
        if (this.vaultItems.some(i => i.object.folderId === item.object.id)) {
          this.dialogService.openWarning(this.getDeleteModalData(item))
            .afterClosed()
            .pipe(
              take(1)
            )
            .subscribe(primaryButtonClicked => {
            if (primaryButtonClicked) {
              this.deleteFolder(item.object.id);
            }
          });
        } else {
          this.deleteFolder(item.object.id);
        }
        break;
      case TypeEnum.PASSWORD:
        this.deletePassword(item.object.id);
        break;
      default:
        break;
    }
  }

  public openModalInEditMode(item: CardData | VaultItem): void {
    const dialogData = {existingObject: item.object};
    const config = getBaseMatDialogConfig();
    config.data = dialogData;

    this.dialogService.open(this.editComponentMap.get(item.type), config);
  }

  public handleContentClicked(cardData: CardData | VaultItem): void {
    switch (cardData.type) {
      case TypeEnum.FOLDER:
        this.folderUtil.folderClicked(cardData.object.id);
        break;
      case TypeEnum.PASSWORD: {
        const config = getBaseMatDialogConfig();
        this.passwordUtil.passwordClicked(cardData.object as Password, config);
        break;
      }
      default:
        break;
    }
  }

  public handleStarClicked(item: CardData | VaultItem): void {
    switch (item.type) {
      case TypeEnum.FOLDER:
        this.folderService.updateStarred(item.object.id)
          .pipe(take(1))
          .subscribe(async folder => {
            this.snackBarService.open(`Folder successfully ${folder.starred ? "starred" : "unstarred"}`);
            await this.folderState.updateFolders(folder, false);
          });
        break;
      case TypeEnum.PASSWORD:
        this.passwordService.updateStarred(item.object.id)
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
    const config = getBaseMatDialogConfig();
    config.data = {
      currentFolderId: this.route.snapshot.params.id,
      selectedType: selectedType
    };
    this.dialogService.open(CreateItemSelectComponent, config);
  }

  public toggleVaultView(): void {
    this.userPreferencesService
      .toggleVaultView()
      .pipe(take(1))
      .subscribe(updatedUserPreferences => {
        this.userPreferenceStateService.updateUserPreferences(updatedUserPreferences);
      })
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.urlSubscription.unsubscribe();
  }

  private setEditComponentMap(): void {
    this.editComponentMap.set(TypeEnum.FOLDER, FolderFormComponent);
    this.editComponentMap.set(TypeEnum.PASSWORD, PasswordFormComponent);
  }
}
