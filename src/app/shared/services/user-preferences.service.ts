import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserPreferences } from "@userPreferences";

@Injectable({
  providedIn: "root"
})
export class UserPreferencesService {

  constructor(private httpClient: HttpClient) { }

  public toggleVaultView(): Observable<UserPreferences> {
    return this.httpClient.put<UserPreferences>("api/userPreferences/toggleVaultView", null);
  }
}
