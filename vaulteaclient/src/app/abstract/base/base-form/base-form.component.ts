import { FormGroup } from "@angular/forms";
import { FormStateEnum } from "@shared";

import { BaseComponent } from "../base-component/base.component";

export abstract class BaseFormComponent extends BaseComponent {
  public form: FormGroup;
  public existingObject?: any;
  public formStateEnum = FormStateEnum;
  public formState: FormStateEnum.CREATE | FormStateEnum.EDIT;

  public abstract setState(): void;
  public abstract submit(): void;
  public abstract cancel(): void;
  protected abstract initForm(): void;
}
