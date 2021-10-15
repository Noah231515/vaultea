import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginPageComponent } from "./login-page/login-page.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
  {
    component: LoginPageComponent,
    data: {
      animation: "HomePage"
    },
    path: "",
  },
  {
    component: SignUpComponent,
    data: {
      animation: "AboutPage"
    },
    path: "signup",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
