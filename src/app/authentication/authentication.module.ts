import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { LoginComponent } from "./login-page/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    UiKitModule,
  ]
})
export class AuthenticationModule { }
