import { Component, Input } from "@angular/core";

import { FormHeaderData } from "./form-header-data.interface";

@Component({
  selector: "vaultea-form-header",
  templateUrl: "./form-header.component.html",
  styleUrls: ["./form-header.component.scss"]
})
export class FormHeaderComponent {
  @Input() public formHeaderData: FormHeaderData;
}
