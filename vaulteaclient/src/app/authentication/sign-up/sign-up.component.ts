import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { USER_SERVICE } from "../../abstract/tokens/user-service.token";
import { CryptoService } from "../../services/crypto-service.interface";
import { UserService } from "../../services/user-service";
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
    @Inject(USER_SERVICE) private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ["", Validators.required],
      username: ["", Validators.required],
      key: [""]
    });
  }

  public navigateToLogin(): void {
    this.router.navigate(["/login"]);
  }

  public async submit(): Promise<void> {
    await this.cryptoService.generateKeys(this.form);

    this.form.get("key")?.setValue(await this.cryptoService.encryptEncryptionKey(this.form));
    this.form.get("password")?.setValue(await this.cryptoService.hashPassword(this.form));
    this.authenticationService.signUp(this.form.getRawValue()).subscribe(() => {
      // stub
    });
  }
}
