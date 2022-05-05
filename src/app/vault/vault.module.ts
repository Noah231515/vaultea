import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
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
import { FolderModule } from "@folder";

import { SharedModule } from "../shared/shared.module";
import { UiKitModule } from "../ui-kit/ui-kit.module";
import { DrawerComponent } from "./drawer/drawer.component";
import { FolderTreeComponent } from "./folder-tree/folder-tree.component";
import { VaultRoutingModule } from "./vault-routing.module";
import { VaultComponent } from "./vault/vault.component";

@NgModule({
  declarations: [
    VaultComponent,
    DrawerComponent,
    FolderTreeComponent
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
    MatMenuModule,
    PortalModule,
    SharedModule,
    MatInputModule,
    UiKitModule,
    VaultRoutingModule,
  ]
})
export class VaultModule { }
