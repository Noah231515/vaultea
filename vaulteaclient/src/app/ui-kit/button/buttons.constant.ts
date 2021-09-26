import { ButtonInterface } from '..';

/**
 * Constant that defines commonly used and important buttons
 */
export class ButtonsConstant {
  public static readonly LOGIN_BUTTON: ButtonInterface = {
    buttonTypeClass: 'mat-raised-button',
    color: 'primary',
    text: 'Login'
  };

  public static readonly SIGNUP_BUTTON: ButtonInterface = {
    buttonTypeClass: 'mat-raised-button',
    color: 'secondary',
    text: 'Sign Up'
  };
}