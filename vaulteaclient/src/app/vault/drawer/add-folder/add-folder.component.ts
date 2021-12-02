import { BaseComponent } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: "vaultea-add-folder",
  templateUrl: "./add-folder.component.html",
  styleUrls: ["./add-folder.component.scss"]
})
export class AddFolderComponent extends BaseComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { super(); }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({

    });
  }

  public submit(): void {

  }

  public cancel(): void {
    
  }
}
