import { BehaviorSubject, Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { CryptoBusinessLogicService, UserKeyService } from "@crypto";
import { User, UserService } from "@identity";
import { KeysToOmitConstant } from "@shared";

import { Password } from "../password.model";

@Injectable({
  providedIn: "root"
})
export class PasswordStateService {

  private passwordsBehaviorSubject: BehaviorSubject<Password[]> = new BehaviorSubject<Password[]>([]);
  public passwordObservable: Observable<Password[]> = this.passwordsBehaviorSubject.asObservable();

  constructor(
    private userKeyService: UserKeyService,
    private userService: UserService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
  ) { }

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

    this.refreshData(user);
  }

  public removePassword(passwordId: string): void {
    const user = this.userService.getUser();
    const index = user.passwords.findIndex(x => x.id == passwordId); // TODO: fix typing of ids
    user.passwords.splice(index, 1);

    this.refreshData(user);
  }

  public getPasswords(): Password[] {
    return this.userService.getUser()?.passwords;
  }

  public refreshData(user?: User): void {
    if (!user) {
      user = this.userService.getUser();
    }
    this.passwordsBehaviorSubject.next(user.passwords);
  }
}
