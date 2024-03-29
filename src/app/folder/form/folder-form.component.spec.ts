import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";
import { Folder } from "@folder";
import { UserService } from "@identity";
import { UserMockService } from "@mock";

import { UiKitModule } from "../../ui-kit/ui-kit.module";
import { FolderService } from "../services/folder.service";
import { FolderFormComponent } from "./folder-form.component";

describe("FolderFormComponent", () => {
  let component: FolderFormComponent;
  let fixture: ComponentFixture<FolderFormComponent>;
  const existingFolder: Folder = {
    id: "1",
    folderId: "",
    name: "Brand new folder",
    description: "Great folder",
    pathNodes: [],
    childFolders: [],
    starred: false
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderFormComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        NoopAnimationsModule,
        UiKitModule,
      ],
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: UserService, useClass: UserMockService },
        FolderService,
        FormBuilder,
        UserKeyService,
        {
          provide: MatDialogRef, useValue: { }
        },
        {
          provide: MAT_DIALOG_DATA, useValue: { existingObject: existingFolder }
        },
        {
          provide: ActivatedRoute, useValue: { }
        }
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
