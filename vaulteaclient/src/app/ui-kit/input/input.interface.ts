import { FormControl } from "@angular/forms";

export interface InputData {
  formControl: FormControl;
  label: string;
  placeholder: string;
  flexAmount?: string;
  maxLength?: number;
  sensitiveDataInput?: boolean;
  required?: boolean;
}
