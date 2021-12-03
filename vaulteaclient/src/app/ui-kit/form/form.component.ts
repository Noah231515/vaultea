import { Component, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { ButtonInterface } from "..";
import { FormHeader } from "../form-header/form-header.interface";

@Component({
  selector: "vaultea-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent {
  @Input() public primaryButton: ButtonInterface;
  @Input() public secondaryButton: ButtonInterface;
  @Input() public formTemplate: TemplateRef<any>;
  @Input() public form: FormGroup;
  @Input() public formHeader: FormHeader;

  @Output() public primaryButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() public secondaryButtonClicked: EventEmitter<void> = new EventEmitter<void>();

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
}
