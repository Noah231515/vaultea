import { BaseFormComponent, CryptoBusinessLogicService, UserDataService, UserKeyService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "@authentication";
import { FormStateEnum, KeysToOmitConstant, VaultDynamicDrawerService } from "@shared";

import { FolderService } from "../folder.service";

@Component({
  selector: "vaultea-folder-form",
  templateUrl: "./folder-form.component.html",
})
export class FolderFormComponent extends BaseFormComponent implements OnInit {

  public headerText: string;

  constructor(
    private formBuilder: FormBuilder,
    private folderService: FolderService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    private userDataService: UserDataService,
    private authenticationService: AuthenticationService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setState();
    this.initForm();
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
      vaultId: [this.existingObject?.vaultId ?? this.authenticationService.getLoggedInUser().vaultId],
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
    this.folderService.create(preparedData).subscribe(createdFolder => {
      this.vaultDynamicDrawerService.setState(false);
      this.userDataService.updateFolders(createdFolder, true);
    });
  }

  private update(preparedData: any): void {
    this.folderService.update(this.existingObject.id, preparedData).subscribe(updatedFolder => {
      this.vaultDynamicDrawerService.setState(false);
      this.userDataService.updateFolders(updatedFolder, false);
    });
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }
}
