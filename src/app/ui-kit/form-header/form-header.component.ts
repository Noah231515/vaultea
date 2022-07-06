import { Component, EventEmitter, Input, Output } from "@angular/core";

import { BaseComponent } from "../shared/components/base-component/base.component";
import { FormHeaderData } from "./form-header-data.interface";

@Component({
  selector: "vaultea-form-header",
  templateUrl: "./form-header.component.html",
  styleUrls: ["./form-header.component.scss"]
})
export class FormHeaderComponent extends BaseComponent {
  @Input() public formHeaderData: FormHeaderData;

  @Output() public editButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() public viewButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  public emitEditButtonClick(): void {
    this.editButtonClicked.emit();
  }

  public emitViewButtonClick(): void {
    this.viewButtonClicked.emit();
  }
}
