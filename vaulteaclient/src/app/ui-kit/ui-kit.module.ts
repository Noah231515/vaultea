import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { AbstractModule } from "../abstract/abstract.module";
import { ButtonComponent } from "./button/button.component";
import { CardComponent } from "./card/card.component";
import { FormFooterComponent } from "./form-footer/form-footer.component";
import { FormComponent } from "./form/form.component";
import { InputComponent } from "./input/input.component";
import { LogoFullComponent } from "./logo-full/logo-full.component";
import { FormHeaderComponent } from "./form-header/form-header.component";

@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    FormComponent,
    FormFooterComponent,
    InputComponent,
    LogoFullComponent,
    FormHeaderComponent,
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    FlexLayoutModule,
    FormComponent,
    FormFooterComponent,
    InputComponent,
    LogoFullComponent,
  ],
  imports: [
    AbstractModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class UiKitModule { }
