import { ButtonInterface } from "..";

/**
 * Constant that defines commonly used and important buttons
 */
export class ButtonsConstant {
  public static readonly LOGIN_BUTTON: ButtonInterface = {
    buttonTypeClass: "mat-raised-button",
    color: "primary",
    text: "Login",
    type: "submit",
    ariaLabel: "Login"
  };

  public static readonly SIGNUP_BUTTON: ButtonInterface = {
    buttonTypeClass: "mat-raised-button",
    color: "accent",
    text: "Sign Up",
    type: "button",
    ariaLabel: "Sign Up"
  };

  public static readonly SUBMIT_BUTTON: ButtonInterface = {
    buttonTypeClass: "mat-raised-button",
    color: "primary",
    text: "Submit",
    type: "submit",
    ariaLabel: "Submit"
  };

  public static readonly CANCEL_BUTTON: ButtonInterface = {
    buttonTypeClass: "mat-button",
    color: "accent",
    text: "Cancel",
    type: "button",
    ariaLabel: "Cancel"
  };

  public static readonly ADD_BUTTON: ButtonInterface = {
    buttonTypeClass: "mat-button",
    color: "primary",
    text: "Add",
    type: "button",
    ariaLabel: "Add"
  };

  public static readonly DELETE_BUTTON: ButtonInterface = {
    buttonTypeClass: "mat-button",
    color: "primary",
    text: "Delete",
    type: "button",
    ariaLabel: "Delete"
  };

  public static readonly FLOATING_ADD_BUTTON: ButtonInterface = {
    buttonTypeClass: "mat-fab",
    color: "accent",
    type:"button",
    ariaLabel: "Add",
    icon: "add"
  }

  public static readonly DRAWER_CANCEL_BUTTON: ButtonInterface = {
    buttonTypeClass: "mat-icon-button",
    color: "primary",
    type:"button",
    ariaLabel: "Cancel",
    icon: "close"
  }
}
