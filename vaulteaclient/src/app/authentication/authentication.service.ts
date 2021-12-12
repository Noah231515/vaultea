import { UserKeyService } from "@abstract";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VaulteaCryptoKey } from "@shared";
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
    private userKeyService: UserKeyService
  ) { }

  public signUp(formData: any): Observable<any> {
    return this.httpClient.post("api/signup", formData);
  }

  public login(formData: any): Observable<any> {
    return this.httpClient.post("api/login", formData)
  }

  public setUser(user: User, encryptionKey: VaulteaCryptoKey): void {
    this.user = user;
    this.userKeyService.setEncryptionKey(encryptionKey);
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
}
