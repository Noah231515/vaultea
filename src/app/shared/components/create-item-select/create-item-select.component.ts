import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormComponent } from "@ui-kit";

import { SelectOption } from "../../../ui-kit/select/select-option.interface";
import { TypeEnum } from "../../enums/type.enum";

@Component({
  selector: "vaultea-create-item-select",
  templateUrl: "./create-item-select.component.html",
  styleUrls: ["./create-item-select.component.scss"]
})
export class CreateItemSelectComponent extends BaseFormComponent implements OnInit {

  public currentFolderId?: string;
  public selectedType: TypeEnum;
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
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: {
      currentFolderId: string
      selectedType: TypeEnum;
    }
  ) {
    super();
    this.currentFolderId = data?.currentFolderId;
    this.selectedType = data?.selectedType;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      itemType: [this.selectedType ?? TypeEnum.FOLDER, Validators.required]
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
