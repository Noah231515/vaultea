import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/abstract";
import { ButtonInterface } from "src/app/ui-kit";

import { slideInAnimation } from "../../animations/slideInAnimation";

@Component({
  selector: "vaultea-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  animations: [
    slideInAnimation
  ]
})
export class LoginPageComponent extends BaseComponent implements OnInit {
  public form: FormGroup;
  public loginButtonInterface: ButtonInterface;
  public signUpButtonInterface: ButtonInterface;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    super()
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  public navigateToSignup(): void {
    this.router.navigate(["/signup"])
  }
}
