import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

import { BaseComponent } from "../base-component/base.component";

export abstract class BaseFormComponent extends BaseComponent {
  public form: FormGroup;
  public existingObject?: any;
  public formState: "Create" | "Edit"; // TODO: revisit

  public abstract setState(): void;
  public abstract submit(): void;
  public abstract cancel(): void;
  protected abstract initForm(): void;
  public toFormControl(abstractControl: AbstractControl): FormControl {
    return abstractControl as FormControl;
  }
}
