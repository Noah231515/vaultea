import { Component, Input } from "@angular/core";
import { FormHeader } from "./form-header.interface";

@Component({
  selector: "vaultea-form-header",
  templateUrl: "./form-header.component.html",
  styleUrls: ["./form-header.component.scss"]
})
export class FormHeaderComponent {
  @Input() public formHeader: FormHeader;
}
