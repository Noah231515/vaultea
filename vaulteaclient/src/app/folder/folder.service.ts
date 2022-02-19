import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { UserDataService } from "../abstract/services/user-data.service";
import { Folder } from "./folder.model";

@Injectable({
  providedIn: "root"
})
export class FolderService implements Resolve<void> {

  constructor(
    private httpClient: HttpClient,
    private userDataService: UserDataService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    if (route.params.id) {
      this.userDataService.setCurrentFolderId(route.params.id);
    } else {
      this.userDataService.setCurrentFolderId(null);
    }
  }

  public create(folder: Folder): Observable<Folder> {
    return this.httpClient.post<Folder>("api/folder", folder);
  }

  public update(folderId: string, folder: Folder): Observable<Folder> {
    return this.httpClient.put<Folder>(`api/folder/${folderId}`, folder);
  }

  public delete(folderId: string): Observable<string> {
    return this.httpClient.delete<string>(`api/folder/${folderId}`);
  }
}
