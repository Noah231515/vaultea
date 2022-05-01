import { Component, Input } from "@angular/core";

import { SelectData } from "./select-data.interface";

@Component({
  selector: "vaultea-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"]
})
export class SelectComponent {
  @Input() public selectData: SelectData;
}
