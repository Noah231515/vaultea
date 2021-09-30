import { ButtonInterface } from '..';

/**
 * Constant that defines commonly used and important buttons
 */
export class ButtonsConstant {
  public static readonly LOGIN_BUTTON: ButtonInterface = {
    buttonTypeClass: 'mat-raised-button',
    color: 'primary',
    text: 'Login',
    type: 'submit'
  };

  public static readonly SIGNUP_BUTTON: ButtonInterface = {
    buttonTypeClass: 'mat-raised-button',
    color: 'secondary',
    text: 'Sign Up',
    type: 'button'
  };

  public static readonly SUBMIT_BUTTON: ButtonInterface = {
    buttonTypeClass: 'mat-raised-button',
    color: 'primary',
    text: 'Submit',
    type: 'submit'
  };

  public static readonly CANCEL_BUTTON: ButtonInterface = {
    buttonTypeClass: 'mat-button',
    color: 'secondary',
    text: 'Cancel',
    type: 'button'
  };
}