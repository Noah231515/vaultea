import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import { VaultRoutingModule } from "./vault-routing.module";
import { VaultComponent } from './vault/vault.component';

@NgModule({
  declarations: [
    VaultComponent
  ],
  imports: [
    CommonModule,
    UiKitModule,
    VaultRoutingModule
  ]
})
export class VaultModule { }
