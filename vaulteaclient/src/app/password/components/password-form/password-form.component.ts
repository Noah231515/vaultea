import { BaseFormComponent } from "@abstract";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AutocompleteUtilService } from "@ui-kit";

import { AutocompleteData } from "../../../ui-kit/autocomplete/autocomplete-data.interface";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "vaultea-password-form",
  styleUrls: ["./password-form.component.scss"],
  templateUrl: "./password-form.component.html",
})
export class PasswordFormComponent extends BaseFormComponent implements OnInit {

  public locationAutocompleteData: AutocompleteData;

  constructor(
    private formBuilder: FormBuilder,
    public autocompleteUtilService: AutocompleteUtilService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
    this.locationAutocompleteData = this.autocompleteUtilService
      .getLocationAutocompleteData(
        this.toFormControl(this.form.get("folderId"))
      );
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      vaultId: [""],
      folderId: [""],
      name: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      note: [""],
      expireDate: [""],
      url: [""]
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
