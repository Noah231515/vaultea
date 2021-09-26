import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/abstract';
import { ButtonInterface, ButtonService } from 'src/app/ui-kit';

@Component({
  selector: 'vaultea-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends BaseComponent implements OnInit {
  public form: FormGroup;
  public loginButtonInterface: ButtonInterface;
  public signUpButtonInterface: ButtonInterface;

  constructor(
    private formBuilder: FormBuilder,
    private buttonService: ButtonService
  ) { 
    super()
  }

  public ngOnInit(): void {
    this.loginButtonInterface = this.buttonService.getLoginButton();
    this.signUpButtonInterface = this.buttonService.getSignUpButton();
    

    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }
}
