import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CryptoService } from "../../services/crypto.service";
import { CryptoUtil } from "../../utils/crypto.util";
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
      key: [""]
    });
  }

  public navigateToLogin(): void {
    this.router.navigate(["/login"]);
  }

  public async submit(): Promise<void> {
    // TODO: implement general method that encrypts form data
    const stretchedMasterKey = await this.cryptoService.generateStretchedMasterKey(this.form.get("password")?.value, this.form.get("email")?.value);
    const encryptionKey = await this.cryptoService.generateEncryptionKey(stretchedMasterKey);
    this.form.get("key")?.setValue(
      CryptoUtil.arrayBufferToAscii(encryptionKey)
    );

    await this.cryptoService.encryptForm(this.form, encryptionKey, ["key"]);
    this.authenticationService.signUp(this.form.getRawValue()).subscribe(() => {
      // stub
    });
  }
}
