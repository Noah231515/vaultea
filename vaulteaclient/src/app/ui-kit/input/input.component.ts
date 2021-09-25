import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'vaultea-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
    @Input() public formControl: AbstractControl;
    @Input() public label: string;
    @Input() public placeholder: string;

  constructor() { }

  public ngOnInit(): void {
  }

}
