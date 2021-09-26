import { Directive } from '@angular/core';
import { ButtonsConstant } from '@ui-kit';

@Directive({
  selector: 'vaultea-base',
})
export abstract class BaseComponent {
  constructor() { }
  public BUTTONS_CONSTANT = ButtonsConstant;

  public SetButtonsConstant(): void {
    this.BUTTONS_CONSTANT = ButtonsConstant;
  }
}
