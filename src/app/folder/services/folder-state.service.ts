import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { CryptoBusinessLogicService, UserKeyService } from "@crypto";
import { User, UserService } from "@identity";
import { KeysToOmitConstant } from "@shared";
import { DataUtil } from "@util";

import { Folder } from "../folder.model";

@Injectable({
  providedIn: "root"
})
export class FolderStateService {

  private folderBehaviorSubject: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);
  public folderObservable: Observable<Folder[]> = this.folderBehaviorSubject.asObservable();

  constructor(
    private userKeyService: UserKeyService,
    private userService: UserService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
  ) {
    this.userService.userObservable
      .pipe(
        take(1)
      )
      .subscribe(user => {
        this.refreshData(user, true);
      });
  }


  public async updateFolders(folder: Folder, newFolder: boolean): Promise<void> {
    const user = this.userService.getUser();

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
    this.refreshData(user, true);
  }

  public removeFolder(folderId: string): void {
    const user = this.userService.getUser();
    const index = user.folders.findIndex(x => x.id == folderId); // TODO: Fix typing of ids. They should be numbers, instead of strings
    user.folders.splice(index, 1);

    this.refreshData(user, true);
  }

  public getFolders(): Folder[] {
    return this.userService.getUser()?.folders;
  }

  public refreshData(user?: User, setFolderData: boolean = false): void {
    if (!user) {
      user = this.userService.getUser();
    }
    if (setFolderData) {
      DataUtil.setChildFolders(user.folders);
      DataUtil.setPathNodes(user.folders);
    }
    this.folderBehaviorSubject.next(user.folders);
  }
}
