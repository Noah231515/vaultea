import { TemplateRef } from "@angular/core";
import { FormControl } from "@angular/forms";

import { AutocompleteOption } from "./autocomplete-option.interface";

export interface AutocompleteData {
  label?: string;
  formControl: FormControl;
  options: AutocompleteOption[];
  required?: boolean;
  displaySubtitle?: boolean;
  placeholder?: string;
  readonly?: boolean;
  requireSelection?: boolean;
}
