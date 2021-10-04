import { Component, Input, OnInit } from "@angular/core";

import { ButtonInterface } from "..";

@Component({
  selector: "vaultea-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
  @Input() public buttonTypeClass: string = "mat-button";
  @Input() public color: string = "primary";
  @Input() public disabled: boolean = false;
  @Input() public text: string = "";
  @Input() public type: string = "";
  @Input() public ariaLabel: string = "";
  @Input() public buttonInterface: ButtonInterface;

  constructor() { }

  public ngOnInit(): void {
    this.buttonTypeClass = this.buttonInterface?.buttonTypeClass ?? this.buttonTypeClass;
    this.color = this.buttonInterface?.color ?? this.color;
    this.disabled = this.buttonInterface?.disabled ?? this.disabled;
    this.text = this.buttonInterface?.text ?? this.text;
    this.type = this.buttonInterface?.type ?? this.type;
    this.ariaLabel = this.buttonInterface?.ariaLabel ?? this.ariaLabel;
  }
}
