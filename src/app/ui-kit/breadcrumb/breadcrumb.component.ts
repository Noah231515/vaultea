import { Component, Input } from "@angular/core";
import { Folder } from "@folder";

@Component({
  selector: "vaultea-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"]
})
export class BreadcrumbComponent {
  @Input() public folder?: Folder;

  public getFolderUrl(folder: Folder): string[] {
    return [`/vault/folder/${folder.id}`];
  }
}
