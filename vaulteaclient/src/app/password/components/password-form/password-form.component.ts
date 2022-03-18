import { take } from "rxjs/operators";

import {
  BaseFormComponent, CryptoBusinessLogicService, FormStateEnum, UserDataService, UserKeyService
} from "@abstract";
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EditData, KeysToOmitConstant } from "@shared";
import { AutocompleteUtilService, SnackBarService } from "@ui-kit";
import { VaultComponent } from "@vault";

import { AutocompleteData } from "../../../ui-kit/autocomplete/autocomplete-data.interface";
import { PasswordService } from "../../services/password.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "vaultea-password-form",
  styleUrls: ["./password-form.component.scss"],
  templateUrl: "./password-form.component.html",
})
export class PasswordFormComponent extends BaseFormComponent implements OnInit {
  @Input() public currentFolderId?: string;
  public locationAutocompleteData: AutocompleteData;

  constructor(
    private formBuilder: FormBuilder,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private passwordService: PasswordService,
    private snackBarService: SnackBarService,
    private userDataService: UserDataService,
    public autocompleteUtilService: AutocompleteUtilService,
    private dialogRef: MatDialogRef<VaultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditData
  ) {
    super();
    this.existingObject = data?.existingObject;
  }

  public ngOnInit(): void {
    this.initForm();
    this.setState();
    this.locationAutocompleteData = this.autocompleteUtilService
      .getLocationAutocompleteData(
        this.toFormControl(this.form.get("folderId"))
      );
  }

  public setState(): void {
    if (this.formState === FormStateEnum.VIEW && this.existingObject) {
      this.headerText = `View ${this.existingObject.name}`;
    } else if (this.existingObject) {
      this.formState = this.formStateEnum.EDIT;
      this.headerText = `Edit ${this.existingObject.name}`;
    } else {
      this.formState = this.formStateEnum.CREATE;
    }
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      folderId: [this.existingObject?.folderId ?? parseInt(this.currentFolderId)],
      name: [this.existingObject?.name ?? "", Validators.required],
      username: [this.existingObject?.username ?? "", Validators.required],
      password: [this.existingObject?.password ?? "", Validators.required],
      note: [this.existingObject?.note ?? ""],
      expireDate: [this.existingObject?.expireDate ?? ""],
      url: [""]
    });
  }

  public async submit(): Promise<void> {
    const preparedData = await this.cryptoBusinessLogicService.prepareForSubmit(
      this.userKeyService.getEncryptionKey(),
      this.form.getRawValue(),
      KeysToOmitConstant.PASSWORD
    );

    if (this.formState === FormStateEnum.CREATE) {
      this.create(preparedData);
    } else {
      this.update(preparedData);
    }
  }

  public create(preparedData: any): void {
    this.passwordService.create(preparedData)
      .pipe(
        take(1)
      )
      .subscribe(async createdPassword => {
        this.userDataService.updatePasswords(createdPassword, true);
        this.snackBarService.open("Password successfully created");
        this.dialogRef.close();
      });
  }

  public update(preparedData: any): void {
    this.passwordService.update(this.existingObject.id, preparedData)
      .pipe(
        take(1)
      )
      .subscribe(updatedPassword => {
        this.userDataService.updatePasswords(updatedPassword, false);
        this.snackBarService.open("Password successfully updated");
        this.dialogRef.close();
      });
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }
}
