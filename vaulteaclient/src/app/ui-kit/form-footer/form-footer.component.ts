import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from 'src/app/abstract';

import { ButtonInterface } from '..';

@Component({
  selector: 'vaultea-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent extends BaseComponent implements OnInit {
  @Input() public primaryButton: ButtonInterface = this.BUTTONS_CONSTANT.SUBMIT_BUTTON;
  @Input() public secondaryButton: ButtonInterface = this.BUTTONS_CONSTANT.CANCEL_BUTTON;

  @Output() public primaryButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() public secondaryButtonClicked: EventEmitter<void> = new EventEmitter<void>();


  constructor() { 
    super()  
  }

  public ngOnInit(): void {
  }

  public emitPrimaryButtonClicked(): void {
    this.primaryButtonClicked.emit();
  }

  public emitSecondaryButtonClicked(): void {
    this.secondaryButtonClicked.emit();
  }
}
