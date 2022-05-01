import { FormControl } from "@angular/forms";

import { SelectOption } from "./select-option.interface";

export class SelectData {
  options: SelectOption[];
  label: string;
  formControl: FormControl;
}
