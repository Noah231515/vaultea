import { combineLatest, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { NestedTreeControl } from "@angular/cdk/tree";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { ActivatedRoute } from "@angular/router";
import { FolderStateService } from "@folder";
import { PasswordStateService } from "@password";
import { TypeEnum } from "@shared";

import { UrlStateService } from "../../services/url-state.service";
import { TreeItem } from "./tree-item.interface";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "vaultea-folder-tree",
  templateUrl: "./folder-tree.component.html",
  styleUrls: ["./folder-tree.component.scss"]
})
export class FolderTreeComponent implements OnInit {
  public treeItemsObservable: Observable<TreeItem[]> = null;
  public treeItems: TreeItem[] = [];

  public typeEnum = TypeEnum;

  public treeControl: NestedTreeControl<TreeItem>;
  public dataSource: Observable<MatTreeNestedDataSource<TreeItem>>;

  public currentId: Observable<string> = this.urlState
    .currentUrl
    .pipe(
      map(url => {
        const parts = url.split(",");
        const id = parts[1];
        return id;
      }),
      tap(id => {
        if (id) {
          const currentFolder = this.folderState.getFolders().find(f => f.id.toString() == id);
          const currentItem = this.treeItems.filter(item => item.itemType == TypeEnum.FOLDER).find(f => f.id == currentFolder.id);

          // Recursively expand parent folder to persist expanded state
          let parentFolder = this.treeItems.find(i => i.id === currentItem.folderId);
          while (parentFolder) {
            this.treeControl.expand(parentFolder);
            parentFolder = this.treeItems.find(i => i.id === parentFolder.folderId);
          }
          this.treeControl.expand(currentItem);
        }
      })
    )

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private folderState: FolderStateService,
    private passwordState: PasswordStateService,
    private urlState: UrlStateService,
    public route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const folderTreeObservable = this.folderState.folderObservable
      .pipe(
        map(folders => {
          return folders.map(folder => {
            const treeItem: TreeItem = {
              id: folder.id,
              name: folder.name,
              folderId: folder.folderId,
              itemType: TypeEnum.FOLDER,
              childItems: []
            }
            return treeItem;
          })
        })
      );

    const passwordTreeObservable = this.passwordState.passwordObservable
      .pipe(
        map(passwords => {
          return passwords.map(password => {
            const treeItem: TreeItem = {
              id: password.id,
              name: password.name,
              folderId: password.folderId,
              itemType: TypeEnum.PASSWORD,
              childItems: []
            }
            return treeItem;
          })
        })
      );

    this.treeItemsObservable = combineLatest([folderTreeObservable, passwordTreeObservable])
      .pipe(
        map((result: [TreeItem[], TreeItem[]]) => {
          return result[0].concat(result[1])
        }),
        tap(treeItems => {
          this.treeItems = treeItems;
          this.treeItems.forEach(item => {
            if (item.itemType === TypeEnum.FOLDER) {
              item.childItems = treeItems.filter(i => item.id == i.folderId);
            }
          })
          this.treeControl = new NestedTreeControl<TreeItem>(item => this.getChildrenObjects(item));
        })
      )

    this.dataSource = this.treeItemsObservable
      .pipe(
        map(items => {
          const dataSource = new MatTreeNestedDataSource<TreeItem>();
          dataSource.data = items.filter(item => item.folderId === null)
          return dataSource;
        }),
        tap(() => this.changeDetectorRef.detectChanges())
      );
  }

  private getChildrenObjects(item: TreeItem): TreeItem[] {
    return item.childItems;
  }

  public hasChild(_: number, node: TreeItem): boolean {
    return node.childItems.length > 0
  }
}
