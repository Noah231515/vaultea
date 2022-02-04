import { BaseFormComponent } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { SelectOption } from "../../../ui-kit/select/select-option.interface";

@Component({
  selector: "vaultea-create-item-select",
  templateUrl: "./create-item-select.component.html",
  styleUrls: ["./create-item-select.component.scss"]
})
export class CreateItemSelectComponent extends BaseFormComponent implements OnInit {

  public options: SelectOption[] = [
    {
      "value": "Folder",
      "displayValue": "Folder"
    },
    {
      "value": "Password",
      "displayValue": "Password"
    }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      itemType: ["Folder", Validators.required]
    });
  }
  public setState(): void {
    throw new Error("Method not implemented.");
  }
  public submit(): void {
    throw new Error("Method not implemented.");
  }
  public cancel(): void {
    throw new Error("Method not implemented.");
  }
}
