import { BaseFormComponent, CryptoBusinessLogicService, FormStateEnum, UserDataService, UserKeyService } from "@abstract";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { KeysToOmitConstant, VaultDynamicDrawerService } from "@shared";
import { AutocompleteUtilService, SnackBarService } from "@ui-kit";

import { AutocompleteData } from "../../../ui-kit/autocomplete/autocomplete-data.interface";
import { PasswordService } from "../../services/password.service";

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
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private passwordService: PasswordService,
    private snackBarService: SnackBarService,
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    private userDataService: UserDataService,
    public autocompleteUtilService: AutocompleteUtilService
  ) {
    super();
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
    this.formState = this.existingObject ? this.formStateEnum.EDIT : this.formStateEnum.CREATE;
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      folderId: [null],
      name: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      note: [""],
      expireDate: [""],
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
    }
  }

  public create(preparedData: any): void {
    this.passwordService.create(preparedData)
      .subscribe(async createdPassword => {
        this.vaultDynamicDrawerService.setState(false);
        this.userDataService.updatePasswords(createdPassword, true);
        this.snackBarService.open("Password successfully created");
      });
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }
}
