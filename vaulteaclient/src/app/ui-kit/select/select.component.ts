import { Component, Input, OnInit } from "@angular/core";

import { SelectData } from "./select-data.interface";

@Component({
  selector: "vaultea-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"]
})
export class SelectComponent implements OnInit {
  @Input() public selectData: SelectData;

  constructor() { }

  public ngOnInit(): void {
  }

}
