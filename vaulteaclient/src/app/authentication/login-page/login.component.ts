import { CRYPTO_SERVICE } from "@abstract";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { BaseComponent } from "../../abstract";
import { USER_SERVICE } from "../../abstract/tokens/user-service.token";
import { CryptoService } from "../../services/crypto-service.interface";
import { UserService } from "../../services/user-service";
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
    @Inject(CRYPTO_SERVICE) private cryptoService: CryptoService,
    @Inject(USER_SERVICE) private userService: UserService,
  ) { 
    super()
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  public navigateToSignup(): void {
    this.router.navigate(["/signup"])
  }

  public async submit(): Promise<void> {
    // TODO: We need to generate master key, stretched master key and create the password hash to check for auth
    // TODO: We need to implmement some key management around logging in, failed login attempts and logging out
    // TODO: sing up not working
    await this.cryptoService.generateKeys(this.form);
    this.form.get("password")?.setValue(await this.cryptoService.hashPassword(this.form));
    const encryptedData = await this.cryptoService.encryptForm(this.form, this.userService.getEncryptionKey(), ["password", "username"]);
    this.authenticationService.login(encryptedData)
      .subscribe(x => {
      });
  }
}
