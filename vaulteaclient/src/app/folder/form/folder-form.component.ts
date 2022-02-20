import { BaseFormComponent, CryptoBusinessLogicService, FormStateEnum, UserDataService, UserKeyService } from "@abstract";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "@authentication";
import { KeysToOmitConstant, SnackBarService, VaultDynamicDrawerService } from "@shared";
import { AutocompleteOption, AutocompleteUtilService } from "@ui-kit";
import { take } from "rxjs/operators";

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
    private authenticationService: AuthenticationService,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute,
    public autocompleteUtilService: AutocompleteUtilService
  ) {
    super();
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
      vaultId: [this.existingObject?.vaultId ?? this.authenticationService?.getLoggedInUser()?.vaultId], // TODO: Remove from form
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
      });
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }
}
