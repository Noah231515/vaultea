import { BaseComponent, CryptoBusinessLogicService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FolderService } from "@shared";

@Component({
  selector: "vaultea-add-folder",
  templateUrl: "./add-folder.component.html",
  styleUrls: ["./add-folder.component.scss"]
})
export class AddFolderComponent extends BaseComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private folderService: FolderService,
    private cryptoBusinessLogicService: CryptoBusinessLogicService
  ) {
    super(); 
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      description: [""]
    });
  }

  public async submit(): Promise<void> {
    const preparedData = await this.cryptoBusinessLogicService.prepareForSubmit(this.form.getRawValue(), true, []);
    this.folderService.create(preparedData).subscribe(createdFolder => {
    });
  }

  public cancel(): void {
    // Close drawer
  }
}
