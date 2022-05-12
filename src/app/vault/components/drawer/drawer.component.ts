import { Component, ViewEncapsulation } from "@angular/core";
import { BaseComponent } from "@ui-kit";

import { UrlStateService } from "../../services/url-state.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-drawer",
  styleUrls: ["./drawer.component.scss"],
  templateUrl: "./drawer.component.html",
})
export class DrawerComponent extends BaseComponent {
  public opened = true;

  constructor(public urlState: UrlStateService) {
    super();
  }

  public toggleSidenav(): void {
    this.opened = !this.opened;
  }
}
