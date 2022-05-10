import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";
import { FolderModule } from "@folder";
import { UserService } from "@identity";
import { UserMockService } from "@mock";
import { PasswordModule } from "@password";

import { UiKitModule } from "../../../ui-kit/ui-kit.module";
import { CreateItemSelectComponent } from "./create-item-select.component";

describe("CreateItemSelectComponent", () => {
  let component: CreateItemSelectComponent;
  let fixture: ComponentFixture<CreateItemSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateItemSelectComponent ],
      imports: [
        CommonModule,
        FolderModule,
        HttpClientTestingModule,
        PasswordModule,
        NoopAnimationsModule,
        UiKitModule,
      ],
      providers: [
        FormBuilder,
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: UserService, useClass: UserMockService },
        UserKeyService,
        {
          provide: MatDialogRef, useValue: { }
        },
        { provide: ActivatedRoute, useValue: {
          snapshot: {
            params: {
              id: 1
            }
          }
        }},
        {
          provide: MAT_DIALOG_DATA, useValue: { existingObject: {} }
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
