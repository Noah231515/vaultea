import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BaseComponent } from "@abstract";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-drawer",
  styleUrls: ["./drawer.component.scss"],
  templateUrl: "./drawer.component.html",
})
export class DrawerComponent extends BaseComponent {
  constructor() { 
    super();
  }
}
