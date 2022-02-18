import { UserDataService } from "@abstract";
import { NestedTreeControl } from "@angular/cdk/tree";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { AuthenticationService } from "@authentication";
import { Folder } from "@folder";
import { tap } from "rxjs/operators";

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
    private changeDetectorRef: ChangeDetectorRef,
    private userDataService: UserDataService
  ) {
  }

  public ngOnInit(): void {
    this.listenForDataChanges();
    this.changeDetectorRef.markForCheck();
  }

  private listenForDataChanges(): void {
    this.userDataService.folderObservable
      .pipe(
        tap(x => x.forEach(folder => {
          folder.childFolders = this.userDataService.getFolders().filter(x => x.folderId === folder.id)
          return x;
        }))
      )
      .subscribe(folders => {
        this.dataSource.data = folders;
      });
  }

  public hasChild(_: number, node: Folder): boolean {
    return node.childFolders.length > 0;
  }
}
