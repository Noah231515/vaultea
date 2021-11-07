import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DrawerComponent } from "./drawer/drawer.component";
import { VaultComponent } from "./vault/vault.component";

const routes: Routes = [
  {
    path: "",
    component: DrawerComponent,
    children: [
      {
        path: "",
        component: VaultComponent,
        outlet: "sidenavContent",
        data: { animation: "vaultPage"}
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaultRoutingModule { }
