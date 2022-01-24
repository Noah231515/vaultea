import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "@authentication";
import { AuthenticationMockService } from "@mock";
import { BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService } from "@shared";

import { UiKitModule } from "../../ui-kit/ui-kit.module";
import { SignUpComponent } from "./sign-up.component";

describe("SignUpComponent", () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SignUpComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatSnackBarModule,
        RouterTestingModule,
        UiKitModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useClass: AuthenticationMockService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        UserKeyService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
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
});
