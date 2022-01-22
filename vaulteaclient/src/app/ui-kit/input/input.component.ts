import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";

import { InputData } from "./input.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "vaultea-input",
  styleUrls: ["./input.component.scss"],
  templateUrl: "./input.component.html",
})
export class InputComponent implements OnInit {
    @Input() public inputData: InputData;

    public hideSensitiveData: boolean;

    public ngOnInit(): void {
      this.inputData.maxLength = this.inputData.maxLength ?? 100;
      this.inputData.flexAmount = this.inputData.flexAmount ?? "100";
      this.inputData.sensitiveDataInput = this.inputData.sensitiveDataInput ?? false;
      this.inputData.required = this.inputData.required ?? false;
      this.hideSensitiveData = this.inputData.sensitiveDataInput ?? false;
    }

    public toggleHideSensitiveData(): void {
      this.hideSensitiveData = !this.hideSensitiveData;
    }
}
