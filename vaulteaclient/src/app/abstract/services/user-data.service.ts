import { Injectable } from "@angular/core";
import { AuthenticationService } from "@authentication";
import { Folder } from "@folder";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export abstract class UserDataService {

  private folderUpdatedBehaviorSubject: BehaviorSubject<Folder> = new BehaviorSubject<Folder>(new Folder());
  public folderUpdatedObservable: Observable<Folder> = this.folderUpdatedBehaviorSubject.asObservable();

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  public updateFolders(folder: Folder, newFolder: boolean): void {
    const user = this.authenticationService.getLoggedInUser();
    if (newFolder) {
      user.folders.push(folder); // TODO: sort in currently sorted order. not yet implemented atm
    }
    this.folderUpdatedBehaviorSubject.next(folder);
  }
}
