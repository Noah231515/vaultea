import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Password } from "../password.model";

@Injectable({
  providedIn: "root"
})
export class PasswordService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public create(folder: Password): Observable<Password> {
    return this.httpClient.post<Password>("api/password", folder);
  }
}
