

import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "@authentication";
import { UserMockService } from "@mock";
import { BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService } from "@shared";

import { UiKitModule } from "../../../ui-kit/ui-kit.module";
import { Password } from "../../password.model";
import { PasswordService } from "../../services/password.service";
import { PasswordFormComponent } from "./password-form.component";

describe("PasswordFormComponent", () => {
  let component: PasswordFormComponent;
  let fixture: ComponentFixture<PasswordFormComponent>;
  const existingPassword: Password = {
    id: "1",
    vaultId: "1",
    name: "Password",
    username: "Test",
    password: "Very good"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordFormComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        UiKitModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: UserService, useClass: UserMockService },
        PasswordService,
        FormBuilder,
        UserKeyService,
        {
          provide: MatDialogRef, useValue: { }
        },
        {
          provide: MAT_DIALOG_DATA, useValue: { existingObject: existingPassword }
        },
        {
          provide: ActivatedRoute, useValue: { }
        }
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

  it("should prepopulate data", () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.get("name").value).toEqual(existingPassword.name);
    expect(component.form.get("username").value).toEqual(existingPassword.username);
    expect(component.form.get("password").value).toEqual(existingPassword.password);
  });
});

