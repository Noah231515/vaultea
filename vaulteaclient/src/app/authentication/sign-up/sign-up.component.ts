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
    const masterKey = await this.cryptoService.computePbkdf2(this.form.get("password")?.value, this.form.get("email")?.value);
    const stretchedMasterKey = await this.cryptoService.generateStretchedMasterKey(this.form.get("password")?.value, this.form.get("email")?.value);
    const encryptionKey = await this.cryptoService.generateEncryptionKey();
    this.form.get("key")?.setValue(
      CryptoUtil.arrayBufferToAscii(await this.cryptoService.encryptData(stretchedMasterKey.encryptionKey, encryptionKey))
    );

    const encryptedData = await this.cryptoService.encryptForm(this.form, encryptionKey, ["key", "password"]);
    const hashedPassword = await this.cryptoService.computePbkdf2(masterKey.keyString, this.form.get("password")?.value);
    this.authenticationService.signUp(encryptedData).subscribe(() => {
      // stub
    });
  }
}
