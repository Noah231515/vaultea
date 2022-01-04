import { BaseFormComponent, CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

import { User } from "..";
import { ButtonInterface } from "../../ui-kit";
import { SnackBarService } from "../../ui-kit/services/snack-bar.service";
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
    private snackBarService: SnackBarService
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

    this.authenticationService.login(rawData)
      .pipe(
        catchError(err => of(this.snackBarService.open(err.error.msg)))
      )
      .subscribe(async (user: User) => {
        await this.authenticationService.setUser(user);
        this.router.navigate(["/vault"]);
      });
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }
  public setState(): void {
    throw new Error("Method not implemented.");
  }
}
