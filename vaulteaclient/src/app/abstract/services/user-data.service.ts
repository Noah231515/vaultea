import { CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { Injectable } from "@angular/core";
import { AuthenticationService, User } from "@authentication";
import { Folder } from "@folder";
import { KeysToOmitConstant, TypeEnum } from "@shared";
import { DataUtil } from "@util";
import { VaultItem } from "@vault";
import { BehaviorSubject, Observable, zip } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Password } from "../../password/password.model";

@Injectable({
  providedIn: "root"
})
export abstract class UserDataService {

  private refreshDataBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(new Folder()); // TODO: Remove
  public refreshDataObservable: Observable<null> = this.refreshDataBehaviorSubject.asObservable();

  private folderBehaviorSubject: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);
  public folderObservable: Observable<Folder[]> = this.folderBehaviorSubject.asObservable()
    .pipe(
      tap(folders => {
        DataUtil.setChildFolders(folders);
        DataUtil.setPathNodes(folders);
      })
    );

  private passwordsBehaviorSubject: BehaviorSubject<Password[]> = new BehaviorSubject<Password[]>([]);
  public passwordObservable: Observable<Password[]> = this.passwordsBehaviorSubject.asObservable();

  public vaultItemsObservable: Observable<VaultItem[]>;
  public currentFolderId: string;

  constructor(
    private authenticationService: AuthenticationService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
  ) {
    const folderVaultObservable = this.folderObservable
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

    const passwordVaultObservable = this.passwordObservable
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

    this.folderBehaviorSubject.next(this.getFolders());
    this.passwordsBehaviorSubject.next(this.getPasswords());

    this.vaultItemsObservable = zip(folderVaultObservable, passwordVaultObservable).pipe(
      map(result => {
        return [].concat(
          result[0].filter(x => this.currentFolderId ? x.object.folderId?.toString() === this.currentFolderId : !x.object.folderId),
          result[1].filter(x => this.currentFolderId ? x.object.folderId?.toString() === this.currentFolderId : x)
        );
      })
    );
  }

  public async updateFolders(folder: Folder, newFolder: boolean): Promise<void> {
    const user = this.authenticationService.getLoggedInUser();

    if (newFolder) {
      user.folders.push(
        await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.FOLDER)
      );
    } else {
      user.folders.splice(
        user.folders.findIndex(x => x.id === folder.id),
        1,
        await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.FOLDER)
      );
    }

    this.refreshData(user);
  }

  public async updatePasswords(password: Password, newPassword: boolean): Promise<void> {
    const user = this.authenticationService.getLoggedInUser();

    if (newPassword) {
      user.passwords.push(
        await this.cryptoBusinessLogicService.decryptObject(password, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.PASSWORD)
      );
    } else {
      user.passwords.splice(
        user.passwords.findIndex(p => p.id === password.id),
        1,
        await this.cryptoBusinessLogicService.decryptObject(password, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.PASSWORD)
      );
    }

    this.refreshData(user);
  }

  private refreshData(user: User): void {
    this.folderBehaviorSubject.next(user.folders);
    this.passwordsBehaviorSubject.next(user.passwords);
  }

  public removeFolder(folderId: string): void {
    const user = this.authenticationService.getLoggedInUser();
    const index = user.folders.findIndex(x => x.id === folderId);
    user.folders.splice(index, 1);

    this.refreshData(user);
  }

  public removePassword(passwordId: string): void {
    const user = this.authenticationService.getLoggedInUser();
    const index = user.passwords.findIndex(x => x.id === passwordId);
    user.passwords.splice(index, 1);

    this.refreshData(user);
  }

  public getFolders(): Folder[] {
    return this.authenticationService.getLoggedInUser().folders;
  }

  public getPasswords(): Password[] {
    return this.authenticationService.getLoggedInUser().passwords;
  }

  public getFlatFolders(): Folder[] {
    let folders = Array.from(this.getFolders());
    let index = 0;

    // eslint-disable-next-line no-constant-condition
    while (folders[index]) {
      const folder = folders[index];
      if (folder) {
        folders = folders.concat(folder.childFolders);
      }
      index++;
    }
    return folders;
  }

  public setCurrentFolderId(folderId?: string): void {
    this.currentFolderId = folderId;
    this.refreshData(this.authenticationService.getLoggedInUser());
  }
}
