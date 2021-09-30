import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vaultea-input',
  styleUrls: ['./input.component.scss'],
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
    @Input() public formControl: any;
    @Input() public label: string;
    @Input() public placeholder: string;
    @Input() public sensitiveDataInput: boolean = false;

    public hideSensitiveData: boolean = false;

  constructor() { }

  public ngOnInit(): void {
    if (this.formControl) {
        this.formControl = this.formControl as FormControl;
    }
  }

}
