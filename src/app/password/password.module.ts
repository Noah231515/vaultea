import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import {
  GeneratePasswordComponent
} from "./components/generate-password/generate-password.component";
import { PasswordFormComponent } from "./components/password-form/password-form.component";

@NgModule({
  declarations: [
    PasswordFormComponent,
    GeneratePasswordComponent
  ],
  exports: [
    PasswordFormComponent
  ],
  imports: [
    MatProgressBarModule,
    ReactiveFormsModule,
    CommonModule,
    UiKitModule
  ]
})
export class PasswordModule { }
