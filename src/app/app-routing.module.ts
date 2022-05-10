import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./authentication/authentication.module").then(m => m.AuthenticationModule)
  },
  {
    path: "vault",
    loadChildren: () => import("./vault/vault.module").then(m => m.VaultModule)
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
