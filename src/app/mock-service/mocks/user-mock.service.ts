import { BehaviorSubject, Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { User } from "@authentication";
import { Folder } from "@folder";
import { Password } from "@password";

@Injectable({
  providedIn: "root"
})
export class UserMockService  {
  private userBehaviorSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public userObservable: Observable<User> = this.userBehaviorSubject.asObservable();

  public childFolder1: Folder = {
    id: "2",
    name: "Child folder",
    description: "",
    folderId: "1",
    pathNodes: [],
    childFolders: [],
    starred: false
  };
  public childFolder2: Folder = {
    id: "3",
    name: "Child child folder",
    description: "",
    folderId: "2",
    pathNodes: [],
    childFolders: [],
    starred: false
  };
  public parentFolder1: Folder = {
    id: "1",
    name: "First folder",
    description: "",
    folderId: "",
    pathNodes: [],
    childFolders: [],
    starred: false
  };
  public parentFolder2: Folder = {
    id: "20",
    name: "Second folder",
    description: "",
    folderId: "",
    pathNodes: [],
    childFolders: [],
    starred: false
  };

  public password1: Password = {
    id: "1",
    name: "Test ",
    username: "Yahh Mon",
    password: "I'm a super secure password",
    starred: false
  }
  public folders = [this.parentFolder1, this.parentFolder2, this.childFolder1, this.childFolder2];
  public passwords = [this.password1];

  constructor() {
    this.setup();
  }

  private setup(): void {
    this.userBehaviorSubject.next({
      id: "1",
      username: "Test Man",
      accessToken: "",
      key: "",
      folders: this.folders,
      passwords: this.passwords
    });
  }

  public getUser(): User {
    return this.userBehaviorSubject.getValue();
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

  public logout(): void {
    return;
  }
}
