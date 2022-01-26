import { BaseComponent } from "@abstract";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { ButtonInterface } from "..";

@Component({
  selector: "vaultea-form-footer",
  templateUrl: "./form-footer.component.html",
  styleUrls: ["./form-footer.component.scss"]
})
export class FormFooterComponent extends BaseComponent implements OnInit {
  @Input() public primaryButton: ButtonInterface;
  @Input() public secondaryButton: ButtonInterface;
  @Input() public fxLayout: "column" | "row" = "column";

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
