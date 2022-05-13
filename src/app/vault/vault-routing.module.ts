import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@identity";

import { DrawerComponent } from "./components/drawer/drawer.component";
import { VaultComponent } from "./components/vault/vault.component";

const routes: Routes = [
  {
    path: "",
    component: DrawerComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "home",
        component: VaultComponent,
        data: { animation: "vaultPage"},
      },
      {
        path: "starred",
        component: VaultComponent,
        data: { animation: "vaultFolderPage"}
      },
      {
        path: "folder/:id",
        component: VaultComponent,
        data: { animation: "vaultFolderPage"}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaultRoutingModule { }
