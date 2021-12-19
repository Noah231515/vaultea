import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTreeModule } from "@angular/material/tree";
import { FolderModule } from "@folder";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import { ContentDrawerComponent } from "./content-drawer/content-drawer.component";
import { DrawerComponent } from "./drawer/drawer.component";
import { VaultRoutingModule } from "./vault-routing.module";
import { VaultComponent } from "./vault/vault.component";

@NgModule({
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
    VaultRoutingModule,
  ]
})
export class VaultModule { }
