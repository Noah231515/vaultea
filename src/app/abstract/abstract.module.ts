import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import {
  FocusInvalidInputDirective
} from "../ui-kit/shared/components/focus-invalid-input/focus-invalid-input.directive";

@NgModule({
  declarations: [
    FocusInvalidInputDirective,
  ],
  exports: [
    FocusInvalidInputDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class AbstractModule { }
