import { BaseFormComponent, CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "..";
import { ButtonInterface } from "../../ui-kit";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "vaultea-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  public form: FormGroup;
  public loginButtonInterface: ButtonInterface;
  public signUpButtonInterface: ButtonInterface;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private browserCryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
  ) { 
    super()
  }

  public ngOnInit(): void {
    this.initForm();
  }
  
  protected initForm(): void {
    this.form = this.formBuilder.group({
      username: ["test1", [Validators.required]],
      password: ["test", Validators.required],
    });
  }

  public navigateToSignup(): void {
    this.router.navigate(["/signup"])
  }

  public async submit(): Promise<void> {
    await this.browserCryptoBusinessLogicService.generateKeys(this.form.get("username")?.value, this.form.get("password")?.value);

    const rawData = Object.assign({}, this.form.getRawValue());
    rawData.password = await this.browserCryptoBusinessLogicService.hashPassword(this.userKeyService.getMasterKey(), rawData.password);

    this.authenticationService.login(rawData).subscribe(async (user: User) => {
      const encryptionKey = await this.browserCryptoBusinessLogicService.decryptEncryptionKey(this.userKeyService.getStretchedMasterKey(), user.key)
      this.authenticationService.setUser(user, encryptionKey);
      this.router.navigate(["/vault"]);
    });
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }
}
