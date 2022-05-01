import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { ButtonInterface } from "../";
import { FormHeaderData } from "../form-header/form-header-data.interface";

@Component({
  selector: "vaultea-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  @Input() public primaryButton: ButtonInterface;
  @Input() public secondaryButton: ButtonInterface;
  @Input() public formTemplate: TemplateRef<unknown>;
  @Input() public form: FormGroup;
  @Input() public readonly?: boolean;
  @Input() public formHeaderData: FormHeaderData;

  @Output() public primaryButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() public secondaryButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() public editButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  public ngOnInit(): void {
    if (this.formHeaderData) {
      this.formHeaderData.readonly = this.formHeaderData?.readonly ?? this.readonly;
    }
  }

  public emitPrimaryButtonClicked(): void {
    if (this.form && this.form?.valid) {
      return this.primaryButtonClicked.emit();
    }

    if (!this.form) {
      return this.primaryButtonClicked.emit();
    }
  }

  public emitSecondaryButtonClicked(): void {
    this.secondaryButtonClicked.emit();
  }

  public emitEditButtonClicked(): void {
    this.editButtonClicked.emit();
  }
}
