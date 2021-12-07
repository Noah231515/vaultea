import { BaseFormComponent, CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "vaultea-sign-up",
  styleUrls: ["./sign-up.component.scss"],
  templateUrl: "./sign-up.component.html",
})
export class SignUpComponent extends BaseFormComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private browserCryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { 
    super();
  }

  public ngOnInit(): void {
    this.authenticationService.logout();
    this.initForm();
  }
  
  protected initForm(): void {
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
    await this.browserCryptoBusinessLogicService.generateKeys(this.form);
    const rawData = Object.assign({}, this.form.getRawValue());

    rawData.key = await this.browserCryptoBusinessLogicService.encryptEncryptionKey(this.form);
    rawData.password = await this.browserCryptoBusinessLogicService.hashPassword(rawData.password);
    this.authenticationService.signUp(rawData).subscribe(() => {
      // TODO: Do something
    });
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }

}
