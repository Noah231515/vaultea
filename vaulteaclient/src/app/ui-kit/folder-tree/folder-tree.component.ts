import { NestedTreeControl } from "@angular/cdk/tree";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { AuthenticationService } from "@authentication";
import { Folder } from "@folder";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "vaultea-folder-tree",
  templateUrl: "./folder-tree.component.html",
  styleUrls: ["./folder-tree.component.scss"]
})
export class FolderTreeComponent implements OnInit {
  public treeControl = new NestedTreeControl<Folder>(folder => folder.childFolders);
  public dataSource = new MatTreeNestedDataSource<Folder>();

  constructor(
    private authenticationService: AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.dataSource.data = this.authenticationService.getLoggedInUser().folders;
    this.changeDetectorRef.markForCheck();
  }

  public hasChild(_: number, node: Folder): boolean {
    return !!node.childFolders[0];
  }
}
