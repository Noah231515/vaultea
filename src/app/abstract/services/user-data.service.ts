import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { User } from "@authentication";
import { Folder } from "@folder";
import { KeysToOmitConstant } from "@shared";
import { DataUtil } from "@util";

import { UserService } from "../../authentication/services/user.service";
import { Password } from "../../password/password.model";
import { CryptoBusinessLogicService } from "./crypto-business-logic.service";
import { UserKeyService } from "./user-key.service";

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

  public sortByBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>("None");

  constructor(
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private userService: UserService,
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

  public async updatePasswords(password: Password, newPassword: boolean): Promise<void> {
    const user = this.userService.getUser();

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

    this.refreshData(user, true);
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
    this.passwordsBehaviorSubject.next(user.passwords);
  }

  public removeFolder(folderId: string): void {
    const user = this.userService.getUser();
    const index = user.folders.findIndex(x => x.id == folderId); // TODO: Fix typing of ids. They should be numbers, instead of strings
    user.folders.splice(index, 1);

    this.refreshData(user, true);
  }

  public removePassword(passwordId: string): void {
    const user = this.userService.getUser();
    const index = user.passwords.findIndex(x => x.id == passwordId); // TODO: fix typing of ids
    user.passwords.splice(index, 1);

    this.refreshData(user, true);
  }

  public getFolders(): Folder[] {
    return this.userService.getUser()?.folders;
  }

  public getPasswords(): Password[] {
    return this.userService.getUser()?.passwords;
  }
}
