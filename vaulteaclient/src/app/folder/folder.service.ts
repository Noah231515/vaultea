import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Folder } from "./folder.model";

@Injectable({
  providedIn: "root"
})
export class FolderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public create(folder: Folder): Observable<Folder> {
    return this.httpClient.post<Folder>("api/folder", folder);
  }

  public update(folderId: string, folder: Folder): Observable<Folder> {
    return this.httpClient.put<Folder>(`api/folder/${folderId}`, folder);
  }

  public delete(folderId: string): Observable<string> {
    return this.httpClient.delete<string>(`api/folder/${folderId}`);
  }

  public transformToNestedState(folders: Folder[]): Folder[] {
    folders.forEach(folder => {
      folder.childFolders = [];
      if (folder.parentFolderId) {
        const parentFolder = folders.find(f => f.id === folder.parentFolderId);
        if (parentFolder) {
          parentFolder.childFolders.push(folder);
        }
      }
    });
    return folders.filter(f => !f.parentFolderId)
  }
}
