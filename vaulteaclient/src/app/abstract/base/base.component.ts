import { Directive } from "@angular/core";

import { ButtonsConstant } from "../../ui-kit/button/buttons.constant";

@Directive({
  selector: "vaultea-base",
})
export abstract class BaseComponent {
  public BUTTONS_CONSTANT: any;
  constructor() { 
    this.BUTTONS_CONSTANT = ButtonsConstant;
  }
}
