import { BaseComponent, CryptoService, UserService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
    private authenticationService: AuthenticationService,
    private cryptoService: CryptoService,
    private userService: UserService,
  ) { 
    super()
  }

  public ngOnInit(): void {
    this.authenticationService.logout();
    this.form = this.formBuilder.group({
      username: ["test1", [Validators.required]],
      password: ["test", Validators.required],
    });
  }

  public navigateToSignup(): void {
    this.router.navigate(["/signup"])
  }

  public async submit(): Promise<void> {
    await this.cryptoService.generateKeys(this.form);

    this.form.get("password")?.setValue(await this.cryptoService.hashPassword(this.form));
    this.authenticationService.login(this.form.getRawValue()).subscribe(user => {
      this.authenticationService.setUser(user);
      this.router.navigate(["/vault"]);
    });
  }
}
