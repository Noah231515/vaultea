import { ButtonsConstant } from "@ui-kit";

export abstract class BaseComponent {
  public BUTTONS_CONSTANT: any;
  constructor() { 
    this.BUTTONS_CONSTANT = ButtonsConstant;
  }
}
