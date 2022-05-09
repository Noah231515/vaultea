import { Component, ViewEncapsulation } from "@angular/core";
import { BaseComponent } from "@ui-kit";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-drawer",
  styleUrls: ["./drawer.component.scss"],
  templateUrl: "./drawer.component.html",
})
export class DrawerComponent extends BaseComponent {
  public opened = true;

  constructor() {
    super();
  }

  public toggleSidenav(): void {
    this.opened = !this.opened;
  }
}
