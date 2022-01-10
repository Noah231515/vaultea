import { BaseFormComponent, CryptoBusinessLogicService, UserDataService, UserKeyService } from "@abstract";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "@authentication";
import { FormStateEnum, KeysToOmitConstant, SnackBarService, VaultDynamicDrawerService } from "@shared";
import { AutocompleteOption } from "@ui-kit";

import { FolderService } from "../folder.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "vaultea-folder-form",
  templateUrl: "./folder-form.component.html",
})
export class FolderFormComponent extends BaseFormComponent implements OnInit {
  public headerText: string;
  public autocompleteOptions: AutocompleteOption[];

  constructor(
    private formBuilder: FormBuilder,
    private folderService: FolderService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    private userDataService: UserDataService,
    private authenticationService: AuthenticationService,
    private snackbarService: SnackBarService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setState();
    this.initForm();
    this.autocompleteOptions = this.buildOptions();
  }

  public setState(): void {
    if (this.existingObject) {
      this.formState = this.formStateEnum.EDIT;
      this.headerText = `Edit ${this.existingObject.name}`;
    } else {
      this.formState = this.formStateEnum.CREATE;
      this.headerText = "Create a Folder";
    }
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      description: [this.existingObject?.description ?? ""],
      name: [this.existingObject?.name ?? "", Validators.required],
      vaultId: [this.existingObject?.vaultId ?? this.authenticationService?.getLoggedInUser()?.vaultId], // TODO: Fix in tests, this should return a stubbed value.
      parentFolderId: [this.existingObject?.parentFolderId ?? null]
    });
  }

  public async submit(): Promise<void> {
    const preparedData = await this.cryptoBusinessLogicService.prepareForSubmit(this.userKeyService.getEncryptionKey(), this.form.getRawValue(), KeysToOmitConstant.FOLDER);
    if (this.formState === FormStateEnum.EDIT) {
      this.update(preparedData);
    }

    if (this.formState === FormStateEnum.CREATE) {
      this.create(preparedData);
    }
  }

  private create(preparedData: any): void {
    this.folderService.create(preparedData).subscribe(async createdFolder => {
      this.vaultDynamicDrawerService.setState(false);
      await this.userDataService.updateFolders(createdFolder, true);
      this.snackbarService.open("Folder successfully created");
    });
  }

  private update(preparedData: any): void {
    this.folderService.update(this.existingObject.id, preparedData).subscribe(async updatedFolder => {
      this.vaultDynamicDrawerService.setState(false);
      await this.userDataService.updateFolders(updatedFolder, false);
      this.snackbarService.open("Folder successfully updated");
    });
  }

  private buildOptions(): AutocompleteOption[] {
    const flatFolders = this.userDataService.getFlatFolders();
    return flatFolders.map(folder => {
      return {
        value: folder.id,
        displayValue: folder.name
      }
    })
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }
}
