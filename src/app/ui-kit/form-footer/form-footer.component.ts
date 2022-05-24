import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";

import { ButtonInterface } from "../";
import { BaseComponent } from "../shared/components/base-component/base.component";

@Component({
  selector: "vaultea-form-footer",
  templateUrl: "./form-footer.component.html",
  styleUrls: ["./form-footer.component.scss"]
})
export class FormFooterComponent extends BaseComponent implements OnInit {
  @Input() public primaryButton: ButtonInterface;
  @Input() public secondaryButton: ButtonInterface;
  @Input() public fxLayout: "column" | "row" = "column";
  @Input() public readonly: boolean = false;
  @Input() public extraButtonsTemplate: TemplateRef<any>;

  @Output() public primaryButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() public secondaryButtonClicked: EventEmitter<void> = new EventEmitter<void>();


  constructor() {
    super();
  }

  public ngOnInit(): void {
    if (!this.primaryButton) {
      this.primaryButton = this.BUTTONS_CONSTANT.SUBMIT_BUTTON;
    }
  }

  public emitPrimaryButtonClicked(): void {
    this.primaryButtonClicked.emit();
  }

  public emitSecondaryButtonClicked(): void {
    this.secondaryButtonClicked.emit();
  }
}
