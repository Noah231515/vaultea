import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "@authentication";
import { Folder } from "@folder";
import { UserMockService } from "@mock";
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
    folderId: "",
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
        HttpClientTestingModule,
        MatDialogModule,
        UiKitModule,
      ],
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: UserService, useClass: UserMockService },
        FolderService,
        FormBuilder,
        HttpClient,
        HttpHandler,
        UserKeyService,
        {
          provide: MatDialogRef, useValue: { }
        },
        {
          provide: MAT_DIALOG_DATA, useValue: { existingObject: existingFolder }
        },
        { provide: ActivatedRoute, useValue: {
          snapshot: {
            params: {
              id: 1
            }
          }
        }}
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
    component.ngOnInit();

    const form = component.form;
    expect(component.headerText).toEqual("Edit " + existingFolder.name);
    expect(form.get("name").value).toEqual(existingFolder.name);
    expect(form.get("description").value).toEqual(existingFolder.description);
    expect(form.get("folderId").value).toEqual("");
  })
});
