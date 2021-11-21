import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginAuthGuard } from "../shared/guards/login-auth.guard";

import { LoginComponent } from "./login-page/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
  {
    component: LoginComponent,
    path: "",
    canActivate: [LoginAuthGuard],
    data: { animation: "loginPage"}
  },
  {
    component: SignUpComponent,
    path: "signup",
    canActivate: [LoginAuthGuard],
    data: { animation: "signupPage"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
