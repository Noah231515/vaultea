import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'vaultea-sign-up',
  styleUrls: ['./sign-up.component.scss'],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  public navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  public signUp(): void {
    this.authenticationService.signUp(this.form.getRawValue()).subscribe(userData => {
      console.log(userData);
    });
  }
}
