import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Folder } from "./folder.model";

@Injectable({
  providedIn: "root"
})
export class FolderService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public create(folder: Folder): Observable<Folder> {
    return this.httpClient.post<Folder>("api/folder", folder);
  }

  public update(folderId: string, folder: Folder): Observable<Folder> {
    return this.httpClient.put<Folder>(`api/folder/${folderId}`, folder);
  }

  public delete(folderId: string): Observable<{id: string}> {
    return this.httpClient.delete<{id: string}>(`api/folder/${folderId}`);
  }

  public updateStarred(folderId: string): Observable<Folder> {
    return this.httpClient.put<Folder>(`api/folder/${folderId}/updateStarred`, null);
  }
}
