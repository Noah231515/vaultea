import { CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { Injectable } from "@angular/core";
import { AuthenticationService, User } from "@authentication";
import { Folder } from "@folder";
import { KeysToOmitConstant } from "@shared";
import { DataUtil } from "@util";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Password } from "../../password/password.model";

@Injectable({
  providedIn: "root"
})
export abstract class UserDataService {

  public setFolderData: boolean = true;
  private refreshDataBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(new Folder()); // TODO: Remove
  public refreshDataObservable: Observable<null> = this.refreshDataBehaviorSubject.asObservable();

  private folderBehaviorSubject: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);
  public folderObservable: Observable<Folder[]> = this.folderBehaviorSubject.asObservable()
    .pipe(
      tap(folders => {
        DataUtil.setChildFolders(folders);
        DataUtil.setPathNodes(folders);
        this.setFolderData = false;
      })
    );

  private passwordsBehaviorSubject: BehaviorSubject<Password[]> = new BehaviorSubject<Password[]>([]);
  public passwordObservable: Observable<Password[]> = this.passwordsBehaviorSubject.asObservable();

  public currentFolderId: string;

  constructor(
    private authenticationService: AuthenticationService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
  ) { }

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
    this.refreshData(user, true);
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

    this.refreshData(user, true);
  }

  public refreshData(user?: User, setFolderData: boolean = false): void {
    if (!user) {
      user = this.authenticationService.getLoggedInUser();
    }
    this.setFolderData = setFolderData;
    this.folderBehaviorSubject.next(user.folders);
    this.passwordsBehaviorSubject.next(user.passwords);
  }

  public removeFolder(folderId: string): void {
    const user = this.authenticationService.getLoggedInUser();
    const index = user.folders.findIndex(x => x.id === folderId);
    user.folders.splice(index, 1);

    this.refreshData(user, true);
  }

  public removePassword(passwordId: string): void {
    const user = this.authenticationService.getLoggedInUser();
    const index = user.passwords.findIndex(x => x.id === passwordId);
    user.passwords.splice(index, 1);

    this.refreshData(user, true);
  }

  public getFolders(): Folder[] {
    return this.authenticationService.getLoggedInUser().folders;
  }

  public getPasswords(): Password[] {
    return this.authenticationService.getLoggedInUser().passwords;
  }
}
