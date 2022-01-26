import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { AuthenticationService } from "@authentication";
import { BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService } from "@shared";

import { AuthenticationMockService } from "../../mock-service/mocks/authentication-mock.service";
import { ButtonComponent } from "../button/button.component";
import { FormComponent } from "./form.component";

describe("FormComponent", () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        ButtonComponent
      ],
      imports: [
        CommonModule,
      ],
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: AuthenticationService, useClass: AuthenticationMockService },
        FormBuilder,
        HttpClient,
        HttpHandler,
        UserKeyService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
