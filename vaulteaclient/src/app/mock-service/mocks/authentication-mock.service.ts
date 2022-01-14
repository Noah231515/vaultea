import { Injectable } from "@angular/core";
import { User } from "@authentication";
import { Folder } from "@folder";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthenticationMockService  {
  private user: User;
  private isLoggedInBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedInObservable: Observable<boolean> = this.isLoggedInBehaviorSubject.asObservable();

  constructor(
    //private httpClient: HttpClient,
//    private userKeyService: UserKeyService,
//    private cryptoBusinessLogicService: CryptoBusinessLogicService
  ) {
  }


  public signUp(formData: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  public login(formData: any): Observable<any> {
    throw new Error("Method not implemented.");
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
    const folder1: Folder = {
      id: "1",
      vaultId: "1",
      parentFolderId: "",
      name: "The best folder",
      description: "Number one folder",
      childFolders: [],
      pathNodes: []
    }
    const folders = [
      folder1
    ];
    this.user = {
      id: "1",
      vaultId: "1",
      username: "Test Man",
      accessToken: "",
      key: "",
      folders: folders
    }
    return this.user;
  }
  private updateIsLoggedIn(): void {
    this.isLoggedInBehaviorSubject.next(!!this.user?.id && !!this.user?.accessToken);
  }
  public updateFolders(folder: Folder, newFolder: boolean): void {
    throw new Error("Method not implemented.");
  }
}
