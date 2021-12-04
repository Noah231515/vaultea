import { BaseComponent, CryptoService, UserService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService, FolderService } from "@shared";
import { AuthenticationService } from '../../../authentication/authentication.service';

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
    private dataService: DataService
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
    const preparedData = await this.dataService.prepareForSubmit(this.form.getRawValue(), true);
    this.folderService.create(preparedData).subscribe(createdFolder => {
      console.log(createdFolder);
    });
  }

  public cancel(): void {
    
  }
}
