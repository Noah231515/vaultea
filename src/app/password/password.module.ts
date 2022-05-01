import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { UiKitModule } from "../ui-kit/ui-kit.module";
import { PasswordFormComponent } from "./components/password-form/password-form.component";

@NgModule({
  declarations: [
    PasswordFormComponent
  ],
  exports: [
    PasswordFormComponent
  ],
  imports: [
    CommonModule,
    UiKitModule
  ]
})
export class PasswordModule { }
