import { BaseFormComponent, CryptoBusinessLogicService, UserDataService, UserKeyService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { VaultDynamicDrawerService } from "@shared";

import { Folder } from "../folder.model";
import { FolderService } from "../folder.service";

@Component({
  selector: "vaultea-folder-form",
  templateUrl: "./folder-form.component.html",
})
export class FolderFormComponent extends BaseFormComponent implements OnInit {
  public existingObject?: Folder;

  constructor(
    private formBuilder: FormBuilder,
    private folderService: FolderService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    private userDataService: UserDataService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.existingObject?.name ?? "", Validators.required],
      description: [this.existingObject?.description ?? ""]
    });
  }

  public async submit(): Promise<void> {
    const preparedData = await this.cryptoBusinessLogicService.prepareForSubmit(this.userKeyService.getEncryptionKey(), this.form.getRawValue(), true, []);
    this.folderService.create(preparedData).subscribe(async createdFolder => {
      this.vaultDynamicDrawerService.setState(false);
      this.userDataService.updateFolders(createdFolder, true);
    });
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }
}
