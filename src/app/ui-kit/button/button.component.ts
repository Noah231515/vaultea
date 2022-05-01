import { Component, Input } from "@angular/core";

import { ButtonInterface } from "..";

@Component({
  selector: "vaultea-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {
  @Input() public buttonData: ButtonInterface;
}
