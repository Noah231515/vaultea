import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

  public update(passwordId: string, folder: Password): Observable<Password> {
    return this.httpClient.put<Password>(`api/password/${passwordId}`, folder);
  }

  public delete(passwordId: string): Observable<string> {
    return this.httpClient.delete<string>(`api/password/${passwordId}`);
  }

  public updateStarred(passwordId: string): Observable<Password> {
    return this.httpClient.put<Password>(`api/password/${passwordId}/updateStarred`, null);
  }
}
