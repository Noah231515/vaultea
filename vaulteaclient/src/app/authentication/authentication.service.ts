import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
    private httpClient: HttpClient
  ) { }

  public signUp(formData: any): Observable<any> {
    return this.httpClient.post("api/signup", formData);
  }

  public login(formData: any): Observable<any> {
    return this.httpClient.post("api/login", formData)
  }

  public setUser(user: User): void {
    this.user = user;
    this.updateIsLoggedIn();
  }

  public isLoggedIn(): boolean {
    return this.isLoggedInBehaviorSubject.getValue();
  }

  public logout(): void {
    this.user = new User();
    this.updateIsLoggedIn();
  }

  private updateIsLoggedIn(): void {
    this.isLoggedInBehaviorSubject.next(!!this.user?.id && !!this.user?.accessToken);
  }

  public getLoggedInUser(): User {
    return this.user;
  }
}
