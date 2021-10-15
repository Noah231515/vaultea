import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginPageComponent } from "./login-page/login-page.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
  {
    component: LoginPageComponent,
    path: "",
  },
  {
    component: SignUpComponent,
    path: "signup",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
