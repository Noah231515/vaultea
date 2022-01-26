import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthenticationService } from "@authentication";
import { Folder } from "@folder";
import { AuthenticationMockService } from "@mock";
import { BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService } from "@shared";

import { UiKitModule } from "../../ui-kit/ui-kit.module";
import { FolderService } from "../folder.service";
import { FolderFormComponent } from "./folder-form.component";

describe("FolderFormComponent", () => {
  let component: FolderFormComponent;
  let fixture: ComponentFixture<FolderFormComponent>;
  const existingFolder: Folder = {
    id: "1",
    vaultId: "1",
    parentFolderId: "",
    name: "Brand new folder",
    description: "Great folder",
    pathNodes: [],
    childFolders: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderFormComponent ],
      imports: [
        BrowserAnimationsModule,
        UiKitModule
      ],
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: AuthenticationService, useClass: AuthenticationMockService },
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

  it("should set the initial state correctly", () => {
    component.existingObject = existingFolder;
    component.ngOnInit();

    const form = component.form;
    expect(component.headerText).toEqual("Edit " + existingFolder.name);
    expect(form.get("name").value).toEqual(existingFolder.name);
    expect(form.get("description").value).toEqual(existingFolder.description);
    expect(form.get("vaultId").value).toEqual("1");
    expect(form.get("parentFolderId").value).toEqual("");
  })
});
