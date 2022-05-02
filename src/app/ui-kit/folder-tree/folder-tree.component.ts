import { UserDataService } from "@abstract";
import { NestedTreeControl } from "@angular/cdk/tree";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { ActivatedRoute, Params } from "@angular/router";
import { Folder } from "@folder";
import { TypeEnum } from "@shared";
import { VaultItem } from "@vault";
import { combineLatest, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "vaultea-folder-tree",
  templateUrl: "./folder-tree.component.html",
  styleUrls: ["./folder-tree.component.scss"]
})
export class FolderTreeComponent implements OnInit {
  public vaultItemsObservable: Observable<VaultItem[]> = null;
  public vaultItems: VaultItem[] = [];

  public treeControl = new NestedTreeControl<VaultItem>(item => (item as any)?.childFolders);
  public dataSource: Observable<MatTreeNestedDataSource<VaultItem>>;

  public params: Observable<Params> = this.route
    .params
    .pipe(
      tap(params => {
        if (params.id) {
          const currentFolder = this.userDataService.getFolders().find(f => f.id.toString() === params.id);
          const currentItem = this.vaultItems.filter(item => item.itemType === TypeEnum.FOLDER).find(f => f.object === currentFolder);
          this.treeControl.expand(currentItem);
        }
      })
    );

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private userDataService: UserDataService,
    public route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {

    const folderVaultObservable = this.userDataService.folderObservable
      .pipe(
        map(folders => {
          return folders.map(folder => {
            const vaultItem: VaultItem = {
              object: folder,
              itemType: TypeEnum.FOLDER
            }
            return vaultItem;
          })
        })
      );

    const passwordVaultObservable = this.userDataService.passwordObservable
      .pipe(
        map(passwords => {
          return passwords.map(password => {
            const vaultItem: VaultItem = {
              object: password,
              itemType: TypeEnum.PASSWORD
            }
            return vaultItem;
          })
        })
      );

    this.vaultItemsObservable = combineLatest([folderVaultObservable, passwordVaultObservable])
      .pipe(
        map((result: [VaultItem[], VaultItem[]]) => {
          return result[0].concat(result[1])
        }),
        tap(vaultItems => {
          this.vaultItems = vaultItems;
        })
      )

    this.dataSource = this.vaultItemsObservable
      .pipe(
        map(items => {
          const dataSource = new MatTreeNestedDataSource<VaultItem>();
          dataSource.data = items
          return dataSource;
        }),
        tap(() => this.changeDetectorRef.detectChanges())
      );
  }

  public hasChild(_: number, node: VaultItem): boolean {
    return (node?.object as any).childFolders?.length > 0;
  }
}
