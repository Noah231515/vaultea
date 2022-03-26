import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

import { FormStateEnum } from "../../enums/form-state.enum";
import { BaseComponent } from "../base-component/base.component";

export abstract class BaseFormComponent extends BaseComponent {
  public form: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public existingObject?: any;
  public formStateEnum = FormStateEnum;
  public formState: FormStateEnum;
  public headerText: string;

  public abstract setState(): void;
  public abstract submit(): void;
  public abstract cancel(): void;
  protected abstract initForm(): void;
  public toFormControl(abstractControl: AbstractControl): FormControl {
    return abstractControl as FormControl;
  }
}
