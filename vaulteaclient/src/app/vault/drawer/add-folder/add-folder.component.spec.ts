import { CryptoBusinessLogicService, UserService } from "@abstract";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataService, FolderService } from "@shared";

import { AuthenticationService } from "../../../authentication/authentication.service";
import { BrowserCryptoService } from "../../../services/browser-crypto.service";
import { VaultModule } from "../../vault.module";
import { AddFolderComponent } from "./add-folder.component";

describe("AddFolderComponent", () => {
  let component: AddFolderComponent;
  let fixture: ComponentFixture<AddFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFolderComponent ],
      imports: [
        BrowserAnimationsModule,
        VaultModule,
      ],
      providers: [
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoService },
        AuthenticationService,
        DataService,
        FolderService,
        FormBuilder,
        HttpClient,
        HttpHandler,
        UserService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});