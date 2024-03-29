import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "@authentication";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";
import { UserMockService } from "@mock";

import { UiKitModule } from "../../ui-kit/ui-kit.module";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let form: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatCardModule,
        MatInputModule,
        UiKitModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useClass: UserMockService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        UserKeyService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    form = new FormGroup({});
    form.addControl("username", new FormControl("Test Man"));
    form.addControl("password", new FormControl("securePassword"));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render the form", () => {
    const form = document.querySelector("vaultea-form");
    const inputs = document.querySelectorAll("vaultea-input");
    const buttons = document.querySelectorAll("vaultea-button");

    expect(form).toBeTruthy();
    expect(inputs.length).toEqual(2);
    expect(buttons.length).toEqual(2);
  });

  it("should hash password", async () => {
    component = fixture.componentInstance;
    component.form = form;

    const preparedData = await component.prepareToSubmit();
    expect(preparedData.username).toEqual("Test Man");
    expect(btoa(preparedData.password)).toEqual("J9pR6E4otVjokma9uArDz8r31+IcqQt7802SCF2I2sI=")
  });
});
