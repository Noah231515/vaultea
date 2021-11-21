import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import Cookies from "js-cookie";
import { User } from "../shared/models/user.model";


@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private user?: User;
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
    const csrfToken = true;
    return !!(this.user && csrfToken);
  }

  public logout(): void {
    // TODO: Remove crsftoken
    // window.Cookies.remove("csrftoken");
    // window.Cookies.remove("sessionid");
    this.user = undefined;
    this.updateIsLoggedIn();
  }

  private updateIsLoggedIn(): void {
    const crsfToken = true;
    this.isLoggedInBehaviorSubject.next(!!(this.user && crsfToken));
  }

  private getLoggedInUser(): Observable<User> {
    return this.httpClient.get<User>("api/loggedInUser");
  }
}
