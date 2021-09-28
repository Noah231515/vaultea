import { Directive } from '@angular/core';
import { ButtonsConstant } from '@ui-kit';

@Directive({
  selector: 'vaultea-base',
})
export abstract class BaseComponent {
  public BUTTONS_CONSTANT: any;
  constructor() { 
    this.BUTTONS_CONSTANT = ButtonsConstant;
  }
}
