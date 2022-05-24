import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import { PasswordFormComponent } from "./components/password-form/password-form.component";
import { GeneratePasswordComponent } from "./components/generate-password/generate-password.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PasswordFormComponent,
    GeneratePasswordComponent
  ],
  exports: [
    PasswordFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UiKitModule
  ]
})
export class PasswordModule { }
