import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddFolderComponent } from "./add-folder.component";
import { FormBuilder } from "@angular/forms";
import { DataService, FolderService } from "@shared";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { VaultModule } from "../../vault.module";
import { CryptoService, UserService } from "@abstract";
import { BrowserCryptoService } from "../../../services/browser-crypto.service";
import { AuthenticationService } from "../../../authentication/authentication.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
        { provide: CryptoService, useClass: BrowserCryptoService },
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
