import { CryptoBusinessLogicService, CryptoFunctionService, UserDataService, UserKeyService } from "@abstract";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTreeModule } from "@angular/material/tree";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthenticationService } from "@authentication";
import { Folder, FolderModule } from "@folder";
import { BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, VaulteaCryptoKey } from "@shared";

import { AuthenticationMockService } from "../../mock-service/mocks/authentication-mock.service";
import { UiKitModule } from "../../ui-kit/ui-kit.module";
import { ContentDrawerComponent } from "../content-drawer/content-drawer.component";
import { DrawerComponent } from "../drawer/drawer.component";
import { VaultComponent } from "./vault.component";

describe("VaultComponent", () => {
  let component: VaultComponent;
  let fixture: ComponentFixture<VaultComponent>;
  let userDataService: UserDataService;
  let cryptoBusinessLogicService: CryptoBusinessLogicService;
  let userKeyService: UserKeyService;
  let key: VaulteaCryptoKey;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        VaultComponent,
        DrawerComponent,
        ContentDrawerComponent,
      ],
      imports: [
        CommonModule,
        FolderModule,
        MatButtonModule,
        MatChipsModule,
        MatDialogModule,
        MatDividerModule,
        MatGridListModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatTreeModule,
        PortalModule,
        UiKitModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: AuthenticationService, useClass: AuthenticationMockService },
        FormBuilder,
        HttpClient,
        HttpHandler,
        UserKeyService,
        UserDataService
      ]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    cryptoBusinessLogicService = TestBed.inject(CryptoBusinessLogicService);
    userKeyService = TestBed.inject(UserKeyService);
    userKeyService.setEncryptionKey(await cryptoBusinessLogicService.generateEncryptionKey());

    fixture = TestBed.createComponent(VaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open the drawer with an empty form", () => {
    component.addItem();
    const form = fixture.nativeElement.querySelector("vaultea-content-drawer").querySelector("vaultea-form");
    const inputs: any[] = form.querySelectorAll("input");

    expect(form).toBeTruthy();
    expect(form.querySelector("h2").textContent).toBeTruthy();
    expect(form.querySelector("button").type).toEqual("submit");
    expect(inputs.length).toEqual(3);
    inputs.forEach(input => {
      expect(input.value).toEqual("");
    });
  });

  fit("should add another card", async () => {
    userDataService = TestBed.inject(UserDataService);

    const before = document.querySelectorAll("vaultea-card");
    expect(before.length).toEqual(2);
    await userDataService.updateFolders(new Folder(), true);
    fixture.detectChanges();
    const after = document.querySelectorAll("vaultea-card");
    expect(after.length).toEqual(3);
  });
});
