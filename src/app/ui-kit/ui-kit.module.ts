import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";

import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { ButtonComponent } from "./button/button.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { FormFooterComponent } from "./form-footer/form-footer.component";
import { FormHeaderComponent } from "./form-header/form-header.component";
import { FormComponent } from "./form/form.component";
import { GenericDialogComponent } from "./generic-dialog/generic-dialog.component";
import { InputComponent } from "./input/input.component";
import { LogoFullComponent } from "./logo-full/logo-full.component";
import { SelectComponent } from "./select/select.component";
import { TextAreaComponent } from "./text-area/text-area.component";

@NgModule({
  declarations: [
    AutocompleteComponent,
    ButtonComponent,
    FormComponent,
    FormFooterComponent,
    FormHeaderComponent,
    InputComponent,
    LogoFullComponent,
    SelectComponent,
    TextAreaComponent,
    BreadcrumbComponent,
    GenericDialogComponent,
    CheckboxComponent,
  ],
  exports: [
    AutocompleteComponent,
    BreadcrumbComponent,
    ButtonComponent,
    FlexLayoutModule,
    FormComponent,
    FormFooterComponent,
    FormHeaderComponent,
    InputComponent,
    LogoFullComponent,
    SelectComponent,
    TextAreaComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    TextFieldModule,
  ],
})
export class UiKitModule { }
