import { CryptoBusinessLogicService, UserDataService, UserKeyService } from "@abstract";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "@authentication";
import { AuthenticationMockService } from "@mock";
import { BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService } from "@shared";

import { CryptoFunctionService } from "../../abstract/services/crypto-function.service";
import { FolderTreeComponent } from "./folder-tree.component";

describe("FolderTreeComponent", () => {
  let component: FolderTreeComponent;
  let fixture: ComponentFixture<FolderTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderTreeComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        UserKeyService,
        UserDataService,
        { provide: AuthenticationService, useClass: AuthenticationMockService },
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
