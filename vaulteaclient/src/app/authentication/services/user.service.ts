import { UserDataService, UserKeyService } from "@abstract";
import { Injectable } from "@angular/core";
import { Folder } from "@folder";
import { Password } from "@password";
import { KeysToOmitConstant } from "@shared";
import { BehaviorSubject, Observable } from "rxjs";

import { CryptoBusinessLogicService } from "../../abstract/services/crypto-business-logic.service";
import { User } from "../user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private userBehaviorSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public userObservable: Observable<User>

  constructor(
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userDataService: UserDataService,
    private userKeyService: UserKeyService,
  ) { }

  public async setUser(user?: User): Promise<void> {
    if (!user) {
      this.userBehaviorSubject.next(null);
    }
    this.userKeyService.setEncryptionKey(await this.cryptoBusinessLogicService.decryptEncryptionKey(this.userKeyService.getStretchedMasterKey(), user.key));

    const folderPromises = user.folders.map(async folder => {
      return (await this.cryptoBusinessLogicService.decryptObject(folder, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.FOLDER) as Folder)
    });

    const passwordPromises = user.passwords.map(async password => {
      return (await this.cryptoBusinessLogicService.decryptObject(password, this.userKeyService.getEncryptionKey(), KeysToOmitConstant.PASSWORD) as Password)
    });

    user.folders = await Promise.all(folderPromises);
    user.passwords = await Promise.all(passwordPromises);
    this.userDataService.refreshData(user, true);
    this.userBehaviorSubject.next(user);
  }

  public getUser(): User {
    return this.userBehaviorSubject.getValue();
  }
}
