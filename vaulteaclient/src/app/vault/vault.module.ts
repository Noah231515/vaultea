import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSidenavModule } from "@angular/material/sidenav";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import { VaultRoutingModule } from "./vault-routing.module";
import { VaultComponent } from "./vault/vault.component";
import { DrawerComponent } from "./drawer/drawer.component";
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    VaultComponent,
    DrawerComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
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
