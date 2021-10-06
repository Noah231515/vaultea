import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CryptoService } from "../../services/crypto.service";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "vaultea-sign-up",
  styleUrls: ["./sign-up.component.scss"],
  templateUrl: "./sign-up.component.html",
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;
  public pbkdf2Params: Pbkdf2Params;
  public keyUsage: KeyUsage[] = ["encrypt", "decrypt"];

  constructor(
    private authenticationService: AuthenticationService,
    private cryptoService: CryptoService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      username: ["", Validators.required],
    });
  }

  public navigateToLogin(): void {
    this.router.navigate(["/login"]);
  }

  public async signUp(): Promise<any> {
    this.cryptoService.test(this.form.get("password")?.value, this.form.get("email")?.value);
    this.authenticationService.signUp(this.form.getRawValue()).subscribe(() => {
      return; // TODO: Stubbed method
    });
    
  }
}
