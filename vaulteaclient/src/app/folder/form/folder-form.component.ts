import { BaseFormComponent, CryptoBusinessLogicService, FormStateEnum, UserDataService, UserKeyService } from "@abstract";
import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { KeysToOmitConstant, SnackBarService, VaultDynamicDrawerService } from "@shared";
import { AutocompleteOption, AutocompleteUtilService } from "@ui-kit";
import { VaultComponent } from "@vault";
import { take } from "rxjs/operators";
import { EditData } from "src/app/shared/models/edit-data.interface";

import { AutocompleteData } from "../../ui-kit/autocomplete/autocomplete-data.interface";
import { FormHeaderData } from "../../ui-kit/form-header/form-header-data.interface";
import { FolderService } from "../folder.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "vaultea-folder-form",
  templateUrl: "./folder-form.component.html",
})
export class FolderFormComponent extends BaseFormComponent implements OnInit {
  public autocompleteOptions: AutocompleteOption[];
  public formHeaderData: FormHeaderData;
  public locationAutocompleteData: AutocompleteData;

  constructor(
    private formBuilder: FormBuilder,
    private folderService: FolderService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    private userDataService: UserDataService,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute,
    public autocompleteUtilService: AutocompleteUtilService,
    private dialogRef: MatDialogRef<VaultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditData
  ) {
    super();
    this.existingObject = data?.existingObject;
  }

  public ngOnInit(): void {
    this.setState();
    this.initForm();
    this.locationAutocompleteData = this.autocompleteUtilService
      .getLocationAutocompleteData(
        this.toFormControl(this.form.get("folderId"))
      );

  }

  public setState(): void {
    if (this.existingObject) {
      this.formState = this.formStateEnum.EDIT;
      this.headerText = `Edit ${this.existingObject.name}`;
      this.formHeaderData = {
        headerText: this.headerText,
        hLevel: "h2"
      }
    } else {
      this.formState = this.formStateEnum.CREATE;
      this.headerText = "Create a Folder";
    }
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      description: [this.existingObject?.description ?? ""],
      name: [this.existingObject?.name ?? "", Validators.required],
      vaultId: ["1"], // TODO: Remove from form
      folderId: [this.existingObject?.folderId ?? (parseInt(this.route.snapshot.params.id) || null)]
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
    this.folderService.create(preparedData)
      .pipe(
        take(1)
      )
      .subscribe(async createdFolder => {
        this.vaultDynamicDrawerService.setState(false);
        await this.userDataService.updateFolders(createdFolder, true);
        this.snackbarService.open("Folder successfully created");
        this.dialogRef.close();
      });
  }

  private update(preparedData: any): void {
    this.folderService.update(this.existingObject.id, preparedData)
      .pipe(
        take(1)
      )
      .subscribe(async updatedFolder => {
        this.vaultDynamicDrawerService.setState(false);
        updatedFolder.childFolders = this.existingObject.childFolders;
        updatedFolder.pathNodes = this.existingObject.pathNodes;
        await this.userDataService.updateFolders(updatedFolder, false);
        this.snackbarService.open("Folder successfully updated");
        this.dialogRef.close();
      });
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }
}
