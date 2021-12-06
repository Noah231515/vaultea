import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FolderService } from "@shared";

import { AuthenticationService } from "../../../authentication/authentication.service";
import { BrowserCryptoBusinessLogicService } from "../../../shared/services/browser-crypto-business-logic.service";
import { BrowserCryptoFunctionService } from "../../../shared/services/browser-crypto-function.service";
import { VaultModule } from "../../vault.module";
import { FolderFormComponent } from "./folder-form.component";

describe("FolderFormComponent", () => {
  let component: FolderFormComponent;
  let fixture: ComponentFixture<FolderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderFormComponent ],
      imports: [
        BrowserAnimationsModule,
        VaultModule,
      ],
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        AuthenticationService,
        FolderService,
        FormBuilder,
        HttpClient,
        HttpHandler,
        UserKeyService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
