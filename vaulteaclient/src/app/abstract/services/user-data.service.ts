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

  constructor(
    private authenticationService: AuthenticationService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService
  ) { }

  public async updateFolders(folder: Folder, newFolder: boolean): Promise<void> { // TODO: IF new folder, folder path data will tell us where to put it
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

      user.folders.push(
        await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.FOLDER)
      ); // TODO: sort in currently sorted order. not yet implemented atm
    } else { // TODO: FOLDER FINDS WILL FAIL FOR NESTED FOLDERS
      // TODO: Pass in path data to find folder and traverse the tree
      const index = user.folders.findIndex(x => x.id === folder.id);
      user.folders.splice(
        index,
        1,
        await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.FOLDER)
      );
    }

    user.folders = DataUtil.transformToNestedState(user.folders);
    this.refreshDataBehaviorSubject.next(null);
  }

  public removeFolder(folderId: string): void {
    const user = this.authenticationService.getLoggedInUser();
    const index = user.folders.findIndex(x => x.id === folderId);
    user.folders.splice(index, 1);
    this.refreshDataBehaviorSubject.next(null);
  }

  public getFolders(): Folder[] {
    return this.authenticationService.getLoggedInUser().folders;
  }

  public getFlatFolders(): Folder[] {
    let folders = Array.from(this.getFolders());
    let index = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const folder = folders[index];
      if (folder) {
        folders = folders.concat(folder.childFolders);
      } else {
        break;
      }
      index++;
    }
    return folders;
  }
}
