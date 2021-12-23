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

  public delete(folderId: string): Observable<string> {
    return this.httpClient.delete<string>(`api/folder/${folderId}`);
  }
}
