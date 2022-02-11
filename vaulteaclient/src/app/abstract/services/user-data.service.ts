import { CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { Injectable } from "@angular/core";
import { AuthenticationService, User } from "@authentication";
import { Folder } from "@folder";
import { KeysToOmitConstant, TypeEnum } from "@shared";
import { DataUtil } from "@util";
import { VaultItem } from "@vault";
import { BehaviorSubject, Observable, zip } from "rxjs";
import { map } from "rxjs/operators";

import { Password } from "../../password/password.model";

@Injectable({
  providedIn: "root"
})
export abstract class UserDataService {

  private refreshDataBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(new Folder()); // TODO: Remove
  public refreshDataObservable: Observable<null> = this.refreshDataBehaviorSubject.asObservable();

  private folderBehaviorSubject: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);
  public folderObservable: Observable<Folder[]> = this.folderBehaviorSubject.asObservable();

  private passwordsBehaviorSubject: BehaviorSubject<Password[]> = new BehaviorSubject<Password[]>([]);
  public passwordObservable: Observable<Password[]> = this.passwordsBehaviorSubject.asObservable();

  public vaultItemsObservable: Observable<VaultItem[]>;

  constructor(
    private authenticationService: AuthenticationService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService
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
      map(result => { // TODO: fix when we can navigate

        return [].concat(
          result[0],
          result[1].filter(x => !x.object["folderId"])
        );
      })
    );
  }

  public async updateFolders(folder: Folder, newFolder: boolean): Promise<void> {
    const user = this.authenticationService.getLoggedInUser(); // TODO: It is likely we could use the pathNodes to speed up the find
    const flatFolders = this.getFlatFolders();

    if (newFolder) {
      folder.childFolders = [];
      if (folder.parentFolderId) {
        const parent = flatFolders.find(f => f.id === folder.parentFolderId);
        parent?.childFolders.push(folder);
        folder.pathNodes = parent?.pathNodes.length ? Array.from(parent.pathNodes) : [];

        if (parent) {
          folder.pathNodes.push(parent);
        }
      }

      // TODO: sort in currently sorted order. not yet implemented atm
      user.folders.push(
        await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.FOLDER)
      );
    } else {
      this.updateFolder(flatFolders, folder);
    }

    user.folders = DataUtil.transformToNestedState(user.folders);
    this.refreshData(user);
  }

  private refreshData(user: User): void {
    this.folderBehaviorSubject.next(user.folders);
    this.passwordsBehaviorSubject.next(user.passwords);
  }

  private async updateFolder(flatFolders: Folder[], folder: Folder): Promise<void> {
    const index = flatFolders.findIndex(x => x.id === folder.id);
    flatFolders.splice(
      index,
      1,
      await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.FOLDER)
    );
  }

  public removeFolder(folderId: string): void {
    const user = this.authenticationService.getLoggedInUser();
    const index = user.folders.findIndex(x => x.id === folderId);
    user.folders.splice(index, 1);

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
}
