import { Injectable } from "@angular/core";
import { User } from "@authentication";
import { Folder } from "@folder";
import { BehaviorSubject, Observable, of } from "rxjs";

import { DataUtil } from "../../utils/data.util";

@Injectable({
  providedIn: "root"
})
export class AuthenticationMockService  {
  private user: User;
  private isLoggedInBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedInObservable: Observable<boolean> = this.isLoggedInBehaviorSubject.asObservable();

  public childFolder1: Folder = {
    id: "2",
    vaultId: "1",
    name: "Child folder",
    description: "",
    parentFolderId: "1",
    pathNodes: [],
    childFolders: []
  };
  public childFolder2: Folder = {
    id: "3",
    vaultId: "1",
    name: "Child child folder",
    description: "",
    parentFolderId: "2",
    pathNodes: [],
    childFolders: []
  };
  public parentFolder1: Folder = {
    id: "1",
    vaultId: "1",
    name: "First folder",
    description: "",
    parentFolderId: "",
    pathNodes: [],
    childFolders: []
  };
  public parentFolder2: Folder = {
    id: "20",
    vaultId: "1",
    name: "Second folder",
    description: "",
    parentFolderId: "",
    pathNodes: [],
    childFolders: []
  };
  public folders = [this.parentFolder1, this.parentFolder2, this.childFolder1, this.childFolder2];

  constructor() {
    this.setup();
  }

  private setup(): void {
    this.user = {
      id: "1",
      vaultId: "1",
      username: "Test Man",
      accessToken: "",
      key: "",
      folders: DataUtil.transformToNestedState(this.folders)
    };
  }

  public signUp(formData: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  public login(formData: any): Observable<any> {
    return of(this.user);
  }
  public setUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public isLoggedIn(): boolean {
    throw new Error("Method not implemented.");
  }
  public logout(): void {
    throw new Error("Method not implemented.");
  }
  public getLoggedInUser(): User {
    return this.user;
  }
  private updateIsLoggedIn(): void {
    this.isLoggedInBehaviorSubject.next(!!this.user?.id && !!this.user?.accessToken);
  }
  public updateFolders(folder: Folder, newFolder: boolean): void {
    throw new Error("Method not implemented.");
  }

  public resetPathNodesAndChildren(): void {
    this.parentFolder1.childFolders = [];
    this.parentFolder1.pathNodes = [];
    this.parentFolder2.childFolders = [];
    this.parentFolder2.pathNodes = [];
    this.childFolder1.childFolders = [];
    this.childFolder1.pathNodes = [];
    this.childFolder2.childFolders = [];
    this.childFolder2.pathNodes = [];
  }
}
