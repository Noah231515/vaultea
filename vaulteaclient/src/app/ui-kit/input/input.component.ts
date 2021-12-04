import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "vaultea-input",
  styleUrls: ["./input.component.scss"],
  templateUrl: "./input.component.html",
})
export class InputComponent implements OnInit {
    @Input() public formControl: any;
    @Input() public label: string;
    @Input() public placeholder: string;
    @Input() public sensitiveDataInput: boolean = false;
    @Input() public flexAmount: string = "100%";
    @Input() public maxLength: number = 100;

    public hideSensitiveData: boolean;

    public ngOnInit(): void {
      this.hideSensitiveData = this.sensitiveDataInput;
      if (this.formControl) {
        this.formControl = this.formControl as FormControl;
      }
    }

    public toggleHideSensitiveData(): void {
      this.hideSensitiveData = !this.hideSensitiveData;
    }
}
