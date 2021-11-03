import { CRYPTO_SERVICE } from "@abstract";
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
    @Inject(CRYPTO_SERVICE) private cryptoService: CryptoService,
    @Inject(USER_SERVICE) private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
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
    const encryptionKey = this.userService.getEncryptionKey();

    this.form.get("key")?.setValue(await this.cryptoService.encryptEncryptionKey(this.form));
    this.form.get("password")?.setValue(await this.cryptoService.hashPassword(this.form));
    const encryptedData = await this.cryptoService.encryptForm(this.form, encryptionKey, ["key", "password"]);
    this.authenticationService.signUp(encryptedData).subscribe(() => {
      // stub
    });
  }
}
