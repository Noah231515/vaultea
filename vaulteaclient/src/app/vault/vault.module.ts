import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTreeModule } from "@angular/material/tree";
import { FolderModule } from "@folder";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import { DrawerComponent } from "./drawer/drawer.component";
import { VaultRoutingModule } from "./vault-routing.module";
import { VaultComponent } from "./vault/vault.component";

@NgModule({
  declarations: [
    VaultComponent,
    DrawerComponent,
  ],
  imports: [
    CommonModule,
    FolderModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatTreeModule,
    PortalModule,
    UiKitModule,
    VaultRoutingModule,
  ]
})
export class VaultModule { }
