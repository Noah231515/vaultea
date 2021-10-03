import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ButtonInterface } from '..';

@Component({
  selector: 'vaultea-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() public primaryButton: ButtonInterface;
  @Input() public secondaryButton: ButtonInterface;
  @Input() public formTemplate: TemplateRef<any>;
  @Input() public form: FormGroup;

  @Output() public primaryButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() public secondaryButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
  }

  public emitPrimaryButtonClicked(): void {
    if (this.form && this.form?.valid) {
      this.primaryButtonClicked.emit();
    }

    if (!this.form) {
      this.primaryButtonClicked.emit();
    }
    this.changeDetectorRef.markForCheck();

  }

  public emitSecondaryButtonClicked(): void {
    this.secondaryButtonClicked.emit();
  }
}
