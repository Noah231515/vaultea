import { Component, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BaseComponent } from "src/app/abstract/base/base-component/base.component";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-drawer",
  styleUrls: ["./drawer.component.scss"],
  templateUrl: "./drawer.component.html",
})
export class DrawerComponent extends BaseComponent {
  public opened = true;

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

  public toggleSidenav(): void {
    this.opened = !this.opened;
  }
}
