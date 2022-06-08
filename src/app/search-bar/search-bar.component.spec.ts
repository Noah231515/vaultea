import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogConfig } from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";
import { UserService } from "@identity";
import { UserMockService } from "@mock";
import { PasswordStateService, PasswordUtil } from "@password";
import { getBaseMatDialogConfig } from "@shared";

import { FolderUtil } from "../folder/utils/folder.util";
import {
  PasswordFormComponent
} from "../password/components/password-form/password-form.component";
import { DialogService } from "../ui-kit/services/dialog.service";
import { FormStateEnum } from "../ui-kit/shared/enums/form-state.enum";
import { UiKitModule } from "../ui-kit/ui-kit.module";
import { VaultComponent } from "../vault/components/vault/vault.component";
import { SearchBarComponent } from "./search-bar.component";

describe("SearchBarComponent", () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
        {
          component: VaultComponent,
          path: "vault/folder/:id"
        }
      ]), UiKitModule ],
      declarations: [ SearchBarComponent ],
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: UserService, useClass: UserMockService },
        FolderUtil,
        PasswordStateService,
        UserKeyService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("handle folder option correctly", () => {
    const folderUtil = TestBed.inject(FolderUtil);
    const spy = jest.spyOn(folderUtil, "folderClicked");
    component.handleOptionSelected("Folder.4");

    expect(spy).toHaveBeenCalledWith("4");
  });

  it("handle password option correctly", () => {
    const dialogService = TestBed.inject(DialogService);
    const spy = jest.spyOn(dialogService, "open");
    const userService = TestBed.inject(UserMockService);
    component.handleOptionSelected("Password.1");

    const config = getBaseMatDialogConfig();
    config.data = {
      existingObject: userService.password1,
      formState: FormStateEnum.VIEW
    };

    expect(spy).toHaveBeenCalledWith(PasswordFormComponent, config);
  });

  it("handle handle default prperly", () => {
    const folderUtil = TestBed.inject(FolderUtil);
    const dialogService = TestBed.inject(DialogService);

    const folderUtilSpy = jest.spyOn(folderUtil, "folderClicked");
    const dialogSpy = jest.spyOn(dialogService, "open");

    component.handleOptionSelected("wrong");

    expect(folderUtilSpy).toHaveBeenCalledTimes(0);
    expect(dialogSpy).toHaveBeenCalledTimes(0);
  });
});
