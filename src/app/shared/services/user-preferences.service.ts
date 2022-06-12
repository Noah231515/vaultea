import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VaultView } from "@userPreferences";

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor(private httpClient: HttpClient) { }

  public toggleVaultView(): Observable<{vaultView: VaultView}> {
    return this.httpClient.put<{vaultView: VaultView}>("api/userPreferences/toggleVaultView", null);
  }
}
