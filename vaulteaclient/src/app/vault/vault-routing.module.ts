import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { VaultComponent } from "./vault/vault.component";

const routes: Routes = [
  {
    path: "",
    component: VaultComponent,
    data: { animation: "vaultPage"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaultRoutingModule { }
