import { FormControl } from "@angular/forms";

export interface TextAreaData {
  label: string;
  formControl: FormControl;
  maxLength?: number;
  placeholder?: string;
  readonly?: boolean;
}
