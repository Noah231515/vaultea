import { AutocompleteOption } from "./autocomplete-option.interface";

export interface AutocompleteData {
  label: string;
  formControl: any; // TODO: Type this
  options: AutocompleteOption[];
  required: boolean;
}
