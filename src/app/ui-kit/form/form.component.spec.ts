import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { AuthenticationService } from "@authentication";
import { BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService } from "@shared";

import { UserMockService } from "../../mock-service/mocks/user-mock.service";
import { ButtonComponent } from "../button/button.component";
import { FormFooterComponent } from "../form-footer/form-footer.component";
import { FormHeaderComponent } from "../form-header/form-header.component";
import { FormComponent } from "./form.component";

describe("FormComponent", () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        ButtonComponent,
        FormHeaderComponent,
        FormFooterComponent
      ],
      imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: AuthenticationService, useClass: UserMockService },
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
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

