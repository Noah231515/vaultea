import { BaseComponent } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Folder, FolderService } from "@folder";
import { CreateItemSelectComponent, TypeEnum, VaultDynamicDrawerService } from "@shared";
import { CardData } from "@ui-kit";
import { Observable, of, Subscription, zip } from "rxjs";
import { catchError, map, take } from "rxjs/operators";

import { UserDataService } from "../../abstract/services/user-data.service";
import { PasswordService } from "../../password/services/password.service";
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

    this.vaultItemsObservable = zip(folderVaultObservable, passwordVaultObservable).pipe(
      map(result => {
        return [].concat(
          result[0].filter(x => this.currentFolderId ? x.object.folderId?.toString() === this.currentFolderId : !x.object.folderId),
          result[1].filter(x => this.currentFolderId ? x.object.folderId?.toString() === this.currentFolderId : x)
        );
      })
    );
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
    this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(CreateItemSelectComponent));
    this.vaultDynamicDrawerService.setState(true);
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
