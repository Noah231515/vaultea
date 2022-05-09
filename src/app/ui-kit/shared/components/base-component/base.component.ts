import { ButtonsConstant } from "../../../button/buttons.constant";

export abstract class BaseComponent {
  public BUTTONS_CONSTANT: typeof ButtonsConstant;
  constructor() {
    this.BUTTONS_CONSTANT = ButtonsConstant;
  }
}
