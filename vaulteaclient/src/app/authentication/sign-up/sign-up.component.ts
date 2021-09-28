import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vaultea-sign-up',
  styleUrls: ['./sign-up.component.scss'],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }
}
