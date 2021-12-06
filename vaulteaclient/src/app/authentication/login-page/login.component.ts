import { BaseComponent, CryptoBusinessLogicService, UserKeyService } from "@abstract";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "@shared";

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
    private browserCryptoBusinessLogicService: CryptoBusinessLogicService,
    private userKeyService: UserKeyService,
  ) { 
    super()
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ["test1", [Validators.required]],
      password: ["test", Validators.required],
    });
  }

  public navigateToSignup(): void {
    this.router.navigate(["/signup"])
  }

  public async submit(): Promise<void> {
    await this.browserCryptoBusinessLogicService.generateKeys(this.form);

    const rawData = Object.assign({}, this.form.getRawValue());
    rawData.password = await this.browserCryptoBusinessLogicService.hashPassword(rawData.password);

    this.authenticationService.login(rawData).subscribe((user: User) => {
      this.authenticationService.setUser(user);
      this.router.navigate(["/vault"]);
    });
  }
}
