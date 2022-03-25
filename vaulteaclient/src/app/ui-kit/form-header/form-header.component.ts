import { BaseComponent } from "@abstract";
import { Component, Input } from "@angular/core";

import { FormHeaderData } from "./form-header-data.interface";

@Component({
  selector: "vaultea-form-header",
  templateUrl: "./form-header.component.html",
  styleUrls: ["./form-header.component.scss"]
})
export class FormHeaderComponent extends BaseComponent {
  @Input() public formHeaderData: FormHeaderData;
}
