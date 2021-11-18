import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { User } from "../shared/models/user.model";


@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private user?: User;

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
  }

  public isLoggedIn(): boolean {
    const csrfToken = true;
    return !!(this.user && csrfToken);
  }

  public logout(): void {
    this.user = undefined;
  }

  private getLoggedInUser(): Observable<User> {
    return this.httpClient.get<User>("api/loggedInUser");
  }
}
