import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AsyncSubject, Observable } from "rxjs";

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

  public isLoggedIn(): Observable<boolean> {
    const result = new AsyncSubject<boolean>();
    const csrfToken = true;

    if (!csrfToken) {
      result.next(false);
      result.complete();
      return result.asObservable();
    }

    if (this.user) {
      result.next(true);
      result.complete();
      return result.asObservable();
    } else {
      this.getLoggedInUser()
        .subscribe(user => {
          this.setUser(user);
          result.next(!!this.user);
          result.complete();
        });
    }
    return result.asObservable();
  }

  public logout(): void {
    this.user = undefined;
  }

  private getLoggedInUser(): Observable<User> {
    return this.httpClient.get<User>("api/loggedInUser");
  }
}
