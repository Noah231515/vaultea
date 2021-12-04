import { BaseComponent, CryptoService, UserService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private cryptoService: CryptoService,
    private userService: UserService
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
    const encryptedData = await this.cryptoService.encryptObject(this.form.getRawValue(), this.userService.getEncryptionKey());
    this.folderService.create(encryptedData).subscribe(createdFolder => {
      console.log(createdFolder);
    });
  }

  public cancel(): void {
    
  }
}
