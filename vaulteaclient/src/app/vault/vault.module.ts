import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSidenavModule } from "@angular/material/sidenav";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import { VaultRoutingModule } from "./vault-routing.module";
import { VaultComponent } from "./vault/vault.component";
import { DrawerComponent } from './drawer/drawer.component';

@NgModule({
  declarations: [
    VaultComponent,
    DrawerComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatSidenavModule,
    UiKitModule,
    VaultRoutingModule,
  ]
})
export class VaultModule { }
