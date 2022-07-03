import { of } from "rxjs";
import { take } from "rxjs/operators";
import { UserPreferencesService } from "src/app/shared/services/user-preferences.service";

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
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTreeModule } from "@angular/material/tree";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";
import { Folder, FolderModule, FolderService, FolderStateService } from "@folder";
import { UserService } from "@identity";
import { TypeEnum, UserDataService } from "@shared";
import { CardData, DialogService } from "@ui-kit";
import { UserPreferenceStateService, VaultView } from "@userPreferences";

import { UserMockService } from "../../../mock-service/mocks/user-mock.service";
import { PasswordService } from "../../../password/services/password.service";
import { SharedModule } from "../../../shared/shared.module";
import { UiKitModule } from "../../../ui-kit/ui-kit.module";
import { CardComponent } from "../card/card.component";
import { DrawerComponent } from "../drawer/drawer.component";
import { VaultComponent } from "./vault.component";

describe("VaultComponent", () => {
  let component: VaultComponent;
  let fixture: ComponentFixture<VaultComponent>;
  let userDataService: UserDataService;
  let cryptoBusinessLogicService: CryptoBusinessLogicService;
  let folderState: FolderStateService;
  let userKeyService: UserKeyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        VaultComponent,
        DrawerComponent,
        CardComponent
      ],
      imports: [
        CommonModule,
        FolderModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDialogModule,
        MatDividerModule,
        MatGridListModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatTreeModule,
        NoopAnimationsModule,
        PortalModule,
        RouterTestingModule,
        SharedModule,
        MatTreeModule,
        MatMenuModule,
        MatInputModule,
        UiKitModule,
      ],
      providers: [
        { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
        { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
        { provide: UserService, useClass: UserMockService },
        FolderStateService,
        FormBuilder,
        HttpClient,
        HttpHandler,
        UserDataService,
        UserKeyService,
        UserPreferenceStateService
      ]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    cryptoBusinessLogicService = TestBed.inject(CryptoBusinessLogicService);
    folderState = TestBed.inject(FolderStateService);
    userKeyService = TestBed.inject(UserKeyService);
    userKeyService.setEncryptionKey(await cryptoBusinessLogicService.generateEncryptionKey());

    fixture = TestBed.createComponent(VaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open a modal with an folder form", () => {
    component.addItem(TypeEnum.FOLDER);
    fixture.detectChanges();
    const form = document.querySelector("vaultea-folder-form")
    fixture.detectChanges();

    expect(form).toBeTruthy();
  });

  it("should open a modal with an empty password form", () => {
    component.addItem(TypeEnum.PASSWORD);
    fixture.detectChanges();
    const form = document.querySelector("vaultea-password-form");
    fixture.detectChanges();

    expect(form).toBeTruthy();
  });

  it("should open a modal with an empty password form", () => {
    component.addItem(null);
    fixture.detectChanges();
    const form = document.querySelector("vaultea-folder-form");
    fixture.detectChanges();

    expect(form).toBeTruthy();
  });

  it("should add another card", async () => {
    userDataService = TestBed.inject(UserDataService);

    const before = document.querySelectorAll("vaultea-card");
    expect(before.length).toEqual(3);
    await folderState.updateFolders(new Folder(), true);
    fixture.detectChanges();
    const after = document.querySelectorAll("vaultea-card");
    expect(after.length).toEqual(4);
  });

  it("should remove a folder card", async () => {
    const userMockService = TestBed.inject(UserMockService);
    const cardData: CardData = {
      object: userMockService.parentFolder2,
      type: TypeEnum.FOLDER
    };
    const folderService = TestBed.inject(FolderService);
    jest.spyOn(folderService, "delete").mockReturnValue(of({id: cardData.object.id }));

    const before = document.querySelectorAll("vaultea-card");
    expect(before.length).toEqual(3);

    component.handleDelete(cardData);
    fixture.detectChanges();

    const after = document.querySelectorAll("vaultea-card");
    expect(after.length).toEqual(2);
  });

  it("should display a confirmation modal", async () => {
    const userMockService = TestBed.inject(UserMockService);
    const cardData: CardData = {
      object: userMockService.parentFolder1,
      type: TypeEnum.FOLDER
    };
    const folderService = TestBed.inject(FolderService);
    jest.spyOn(folderService, "delete").mockReturnValue(of({id: cardData.object.id}));

    const before = document.querySelectorAll("vaultea-card");
    expect(before.length).toEqual(3);

    component.handleDelete(cardData);
    fixture.detectChanges();

    const after = document.querySelectorAll("vaultea-card");
    const genericDialog = document.querySelector("vaultea-generic-dialog");

    expect(genericDialog).toBeTruthy()
    expect(after.length).toEqual(3);
  });

  it("should remove a password card", async () => {
    const userMockService = TestBed.inject(UserMockService);
    const cardData: CardData = {
      object: userMockService.password1,
      type: TypeEnum.PASSWORD
    };
    const passwordService = TestBed.inject(PasswordService);
    jest.spyOn(passwordService, "delete").mockReturnValue(of({id: cardData.object.id }));

    const before = document.querySelectorAll("vaultea-card");
    expect(before.length).toEqual(3);

    component.handleDelete(cardData);
    fixture.detectChanges();

    const after = document.querySelectorAll("vaultea-card");
    expect(after.length).toEqual(2);
  });

  it("should sort vault items by name", async () => {
    const userMockService = TestBed.inject(UserMockService);

    userDataService.sortByBehaviorSubject.next("name");
    component.vaultItemsObservable.subscribe(items => {
      expect(userDataService.sortByBehaviorSubject.getValue()).toEqual("name");
      expect(items).toEqual([userMockService.parentFolder1, userMockService.parentFolder2, userMockService.password1])
    })
  });

  it("should open password form in view mode", async () => {
    const userMockService = TestBed.inject(UserMockService);
    const dialogService = TestBed.inject(DialogService);
    const dialogSpy = jest.spyOn(dialogService, "open");

    const cardData: CardData = {
      object: userMockService.password1,
      type: TypeEnum.PASSWORD
    };

    component.handleContentClicked(cardData);
    const passwordForm = document.querySelector("vaultea-password-form");

    expect(passwordForm).toBeTruthy();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it("should toggle vault view", (done) => {
    let userPreferencesStateService: UserPreferenceStateService = TestBed.inject(UserPreferenceStateService);
    let userPreferencesService: UserPreferencesService = TestBed.inject(UserPreferencesService);

    const stateServiceSpy = jest.spyOn(userPreferencesStateService, "updateUserPreferences");
    const serviceSpy = jest.spyOn(userPreferencesService, "toggleVaultView")
      .mockReturnValue(of({
        vaultView: VaultView.List
      }));

    component.toggleVaultView();

    userPreferencesStateService
      .userPreferencesObservable
      .pipe(take(1))
      .subscribe(userPreferences => {
        expect(serviceSpy).toHaveBeenCalled();
        expect(stateServiceSpy).toHaveBeenCalled();
        expect(userPreferences.vaultView).toEqual(VaultView.List);
        done();
      })
  });

  // TODO: Come back to these
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // it("should star the folder", fakeAsync (() => {
  //   const userMockService = TestBed.inject(UserMockService);
  //   const cryptoBusinessLogicService = TestBed.inject(CryptoBusinessLogicService);
  //   const folderService = TestBed.inject(FolderService);
  //   const userDataService = TestBed.inject(UserDataService);

  //   const updatedFolder = userMockService.parentFolder1;
  //   updatedFolder.starred = true;

  //   const promise = new Promise(function(resolve, reject) {
  //     resolve(() => {
  //       console.log("suc")
  //       return updatedFolder;
  //     });
  //     reject((reason: any) => {
  //       console.log("fail")
  //       return updatedFolder
  //     })

  //   });

  //   const spy = jest.spyOn(cryptoBusinessLogicService, "decryptObject").mockReturnValue(promise);
  //   const spy2 = jest.spyOn(folderService, "updateStarred").mockReturnValue(of(updatedFolder));
  //   const spy3  = jest.spyOn(userDataService, "refreshData");
  //   const spy4 = jest.spyOn(userDataService, "updateFolders");

  //   const cardData: CardData = {
  //     object: userMockService.parentFolder1,
  //     type: TypeEnum.FOLDER
  //   };

  //   component.handleStarClicked(cardData);
  //   tick(100000);
  //   const starIcons = Array.from(document.querySelectorAll("mat-icon")).filter(i => i.innerHTML === "star");
  //   console.log(userDataService.getFolders()[0])

  //   expect(spy).toHaveBeenCalled()
  //   expect(spy2).toHaveBeenCalled();
  //   expect(spy4).toHaveBeenCalled();
  //   expect(spy3).toHaveBeenCalled()
  //   expect(starIcons.length).toEqual(1);
  // }));

  // TODO: Come back to this
  // it("should retain sorted order upon adding new folder or password", async () => {
  //   const firstFolder: Folder = {
  //     id: "50",
  //     vaultId: "1",
  //     name: "Awesome folder",
  //     description: "",
  //     folderId: "",
  //     pathNodes: [],
  //     childFolders: []
  //   };
  //   const userMockService = TestBed.inject(UserMockService);
  //   const userService = TestBed.inject(UserService);

  //   const user = userService.getUser();
  //   user.folders.push(firstFolder);

  //   userDataService.refreshData(user);
  //   userDataService.sortByBehaviorSubject.next("name");

  //   component.vaultItemsObservable.subscribe(items => {
  //     expect(userDataService.sortByBehaviorSubject.getValue()).toEqual("name");
  //     expect(items).toEqual([firstFolder, userMockService.parentFolder1, userMockService.parentFolder2, userMockService.password1]);
  //   })
  // });
});
