import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ButtonComponent } from './button/button.component';
import { FormFooterComponent } from './form-footer/form-footer.component';
import { InputComponent } from './input/input.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    FormFooterComponent,
    FormComponent,
  ],
  exports: [
    ButtonComponent,
    FlexLayoutModule,
    FormFooterComponent,
    InputComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class UiKitModule { }
