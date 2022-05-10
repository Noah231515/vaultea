import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";

import { CryptoBusinessLogicService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserKeyService } from "@shared";
import { BaseFormComponent, ButtonInterface, SnackBarService } from "@ui-kit";

import { User } from "../";
import { AuthenticationService } from "../authentication.service";
import { UserService } from "../services/user.service";

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
    private snackBarService: SnackBarService,
    private userService: UserService
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async prepareToSubmit(): Promise<any> {
    await this.browserCryptoBusinessLogicService.generateKeys(this.form.get("username")?.value, this.form.get("password")?.value);
    const rawData = Object.assign({}, this.form.getRawValue());
    rawData.password = await this.browserCryptoBusinessLogicService.hashPassword(this.userKeyService.getMasterKey(), rawData.password);
    return rawData;
  }

  public async submit(): Promise<void> {
    const preparedData = await this.prepareToSubmit();
    this.authenticationService.login(preparedData)
      .pipe(
        take(1),
        catchError(err => of(this.snackBarService.open(err.error.msg)))
      )
      .subscribe(async (user: User) => {
        await this.userService.setUser(user);
        this.router.navigate(["/vault/home"]);
      });
  }

  public cancel(): void {
    throw new Error("Method not implemented.");
  }
  public setState(): void {
    throw new Error("Method not implemented.");
  }
}
