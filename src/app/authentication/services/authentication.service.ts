import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { UserService } from "../../identity/services/user.service";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  public signUp(formData: any): Observable<any> {
    return this.httpClient.post("api/signup", formData);
  }

  public login(formData: any): Observable<any> {
    return this.httpClient.post("api/login", formData)
  }

  public logout(): void {
    this.userService.setUser(null);
  }
}
