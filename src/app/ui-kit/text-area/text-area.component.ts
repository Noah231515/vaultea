import { Component, Input } from "@angular/core";

import { TextAreaData } from "./text-area-data.interface";

@Component({
  selector: "vaultea-text-area",
  templateUrl: "./text-area.component.html",
  styleUrls: ["./text-area.component.scss"]
})
export class TextAreaComponent {
  @Input() public textAreaData: TextAreaData;
}
