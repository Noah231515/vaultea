import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthenticationService } from "@authentication";
import { AuthenticationMockService } from "@mock";
import { BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, VaultDynamicDrawerService } from "@shared";
import { AutocompleteUtilService, SnackBarService } from "@ui-kit";

import { Password } from "../../password.model";
import { PasswordService } from "../../services/password.service";
import { PasswordFormComponent } from "./password-form.component";

describe("PasswordFormComponent", () => {
  let component: PasswordFormComponent;
  let fixture: ComponentFixture<PasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordFormComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationMockService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        AutocompleteUtilService,
        FormBuilder,
        PasswordService,
        SnackBarService,
        UserKeyService,
        VaultDynamicDrawerService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  fit("should prepopulate data", () => {
    const form = component.form;
    const password: Password = {
      id: "1",
      vaultId: "1",
      name: "Password",
      username: "Test",
      password: "Very good"
    };
    component.existingObject = password;
    component.ngOnInit();
    fixture.detectChanges();

    expect(form.get("name").value).toEqual(password.name);
    expect(form.get("username").value).toEqual(password.username);
    expect(form.get("password").value).toEqual(password.password);
  });
});
