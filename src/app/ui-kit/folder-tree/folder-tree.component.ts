import { UserDataService } from "@abstract";
import { NestedTreeControl } from "@angular/cdk/tree";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { ActivatedRoute, Params } from "@angular/router";
import { Folder } from "@folder";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "vaultea-folder-tree",
  templateUrl: "./folder-tree.component.html",
  styleUrls: ["./folder-tree.component.scss"]
})
export class FolderTreeComponent {
  public treeControl = new NestedTreeControl<Folder>(folder => folder.childFolders);
  public dataSource: Observable<MatTreeNestedDataSource<Folder>> = this.userDataService
    .folderObservable
    .pipe(
      map(folders => {
        const dataSource = new MatTreeNestedDataSource<Folder>();
        dataSource.data = folders.filter(folder => !folder.folderId)
        return dataSource;
      }),
      tap(() => this.changeDetectorRef.detectChanges())
    );

  public params: Observable<Params> = this.route
    .params
    .pipe(
      tap(params => {
        if (params.id) {
          const currentFolder = this.userDataService.getFolders().find(f => f.id.toString() === params.id);
          this.treeControl.expand(currentFolder);
        }
      })
    );

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private userDataService: UserDataService,
    public route: ActivatedRoute
  ) {
  }

  public hasChild(_: number, node: Folder): boolean {
    return node.childFolders.length > 0;
  }
}
