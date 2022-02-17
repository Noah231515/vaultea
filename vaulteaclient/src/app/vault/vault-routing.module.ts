import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@shared";

import { FolderService } from "../folder/folder.service";
import { DrawerComponent } from "./drawer/drawer.component";
import { VaultComponent } from "./vault/vault.component";

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
    resolve: {
      filterFolders: FolderService
    }
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
    resolve: {
      filterFolders: FolderService
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaultRoutingModule { }
