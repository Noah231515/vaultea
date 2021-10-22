import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { BaseComponent } from "../../abstract";
import { ButtonInterface } from "../../ui-kit";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "vaultea-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public form: FormGroup;
  public loginButtonInterface: ButtonInterface;
  public signUpButtonInterface: ButtonInterface;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    super()
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required]
    });
  }

  public navigateToSignup(): void {
    this.router.navigate(["/signup"])
  }

  public submit(): void {
    this.authenticationService.login(this.form.getRawValue())
      .subscribe(x => {

      });
  }
}
