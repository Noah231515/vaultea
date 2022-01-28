import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTreeModule } from "@angular/material/tree";

import { AbstractModule } from "../abstract/abstract.module";
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { ButtonComponent } from "./button/button.component";
import { CardComponent } from "./card/card.component";
import { FolderTreeComponent } from "./folder-tree/folder-tree.component";
import { FormFooterComponent } from "./form-footer/form-footer.component";
import { FormHeaderComponent } from "./form-header/form-header.component";
import { FormComponent } from "./form/form.component";
import { InputComponent } from "./input/input.component";
import { LogoFullComponent } from "./logo-full/logo-full.component";
import { SelectComponent } from "./select/select.component";

@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    FormComponent,
    FormFooterComponent,
    InputComponent,
    LogoFullComponent,
    FormHeaderComponent,
    FolderTreeComponent,
    AutocompleteComponent,
    SelectComponent,
  ],
  exports: [
    AutocompleteComponent,
    ButtonComponent,
    CardComponent,
    FlexLayoutModule,
    FolderTreeComponent,
    FormComponent,
    FormFooterComponent,
    InputComponent,
    LogoFullComponent,
    SelectComponent
  ],
  imports: [
    AbstractModule,
    CommonModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTreeModule,
    ReactiveFormsModule,
  ],
})
export class UiKitModule { }
