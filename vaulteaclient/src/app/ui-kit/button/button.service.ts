import { Injectable } from '@angular/core';

import { ButtonInterface } from '..';

/**
 * Defines commonly used and important buttons
 */
@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  constructor() { }

  public getLoginButton(): ButtonInterface {
    return {
      buttonTypeClass: 'mat-raised-button',
      color: 'primary',
      text: 'Login'
    };
  }

  public getSignUpButton(): ButtonInterface {
    return {
      buttonTypeClass: 'mat-raised-button',
      color: 'secondary',
      text: 'Sign Up'
    };
  }
}
