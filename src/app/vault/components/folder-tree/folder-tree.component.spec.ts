import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTreeModule } from "@angular/material/tree";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "@authentication";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";
import { UserMockService } from "@mock";
import { UserDataService } from "@shared";

import { FolderTreeComponent } from "./folder-tree.component";

describe("FolderTreeComponent", () => {
  let component: FolderTreeComponent;
  let fixture: ComponentFixture<FolderTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderTreeComponent ],
      imports: [
        RouterTestingModule,
        MatTreeModule
      ],
      providers: [
        UserKeyService,
        UserDataService,
        { provide: AuthenticationService, useClass: UserMockService },
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
