import { CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Folder } from "@folder";
import { BehaviorSubject, Observable } from "rxjs";

import { User } from "./user.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private user: User;
  private isLoggedInBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedInObservable: Observable<boolean> = this.isLoggedInBehaviorSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private userKeyService: UserKeyService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService
  ) { }

  public signUp(formData: any): Observable<any> {
    return this.httpClient.post("api/signup", formData);
  }

  public login(formData: any): Observable<any> {
    return this.httpClient.post("api/login", formData)
  }

  public async setUser(user: User): Promise<void> {
    this.user = user;
    this.userKeyService.setEncryptionKey(await this.cryptoBusinessLogicService.decryptEncryptionKey(this.userKeyService.getStretchedMasterKey(), user.key));
    this.updateIsLoggedIn();
  }

  public isLoggedIn(): boolean {
    return this.isLoggedInBehaviorSubject.getValue();
  }

  public logout(): void {
    this.user = new User();
    this.updateIsLoggedIn();
    // TODO: Clear out keys
  }

  private updateIsLoggedIn(): void {
    this.isLoggedInBehaviorSubject.next(!!this.user?.id && !!this.user?.accessToken);
  }

  public getLoggedInUser(): User {
    return this.user;
  }

  public updateFolders(folder: Folder, newFolder: boolean): void {
    if (newFolder) {
      this.user.folders.push(folder);
    }
  }
}
