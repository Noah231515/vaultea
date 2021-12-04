import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSidenavModule } from "@angular/material/sidenav";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import { VaultRoutingModule } from "./vault-routing.module";
import { VaultComponent } from "./vault/vault.component";
import { DrawerComponent } from "./drawer/drawer.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatTreeModule } from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { AddFolderComponent } from "./drawer/add-folder/add-folder.component";

@NgModule({
  declarations: [
    VaultComponent,
    DrawerComponent,
    AddFolderComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatTreeModule,
    UiKitModule,
    VaultRoutingModule,
  ]
})
export class VaultModule { }
