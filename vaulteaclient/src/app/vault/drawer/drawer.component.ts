import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BaseComponent } from "@abstract";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { MatDialog } from "@angular/material/dialog";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-drawer",
  styleUrls: ["./drawer.component.scss"],
  templateUrl: "./drawer.component.html",
})
export class DrawerComponent extends BaseComponent {
  public treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  public dataSource = new MatTreeNestedDataSource<FoodNode>();
  public opened = true;
  
  constructor(
    private dialog: MatDialog
  ) {
    super();
    this.dataSource.data = TREE_DATA;
  }

  public hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  public toggleSidenav(): void {
    this.opened = !this.opened;
  }

  public openAddFolderDialog(): void {

  }
}
