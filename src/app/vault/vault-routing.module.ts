import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@identity";

import { DrawerComponent } from "./components/drawer/drawer.component";
import { VaultComponent } from "./components/vault/vault.component";

const routes: Routes = [
  {
    path: "home",
    component: DrawerComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        component: VaultComponent,
        outlet: "sidenavContent",
        data: { animation: "vaultPage"},
      },
    ],
  },
  {
    path: "folder/:id",
    component: DrawerComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        component: VaultComponent,
        outlet: "sidenavContent",
        data: { animation: "vaultFolderPage"}
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaultRoutingModule { }
