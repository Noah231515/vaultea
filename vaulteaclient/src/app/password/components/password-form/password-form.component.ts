import { BaseFormComponent } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "vaultea-password-form",
  templateUrl: "./password-form.component.html",
  styleUrls: ["./password-form.component.scss"]
})
export class PasswordFormComponent extends BaseFormComponent implements OnInit {

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
