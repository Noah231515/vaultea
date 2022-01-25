import { CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "@authentication";
import { Folder } from "@folder";
import { KeysToOmitConstant } from "@shared";
import { DataUtil } from "@util";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export abstract class UserDataService {

  private refreshDataBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(new Folder()); // TODO: figure out this issue. Should be able to me null
  public refreshDataObservable: Observable<null> = this.refreshDataBehaviorSubject.asObservable();

  private folderBehaviorSubject: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);
  public folderObservable: Observable<Folder[]> = this.folderBehaviorSubject.asObservable();

  constructor(
    private authenticationService: AuthenticationService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService
  ) {
    this.folderBehaviorSubject.next(this.getFolders());
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
    this.refreshDataBehaviorSubject.next(null);
    this.folderBehaviorSubject.next(user.folders);
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
    this.refreshDataBehaviorSubject.next(null);
    this.folderBehaviorSubject.next(user.folders);
  }

  public getFolders(): Folder[] {
    return this.authenticationService.getLoggedInUser().folders;
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
