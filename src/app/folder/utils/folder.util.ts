import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class FolderUtil {
  constructor(private router: Router) {}

  public folderClicked(folderId: string): void {
    this.router.navigateByUrl(`vault/folder/${folderId}`);
  }
}
