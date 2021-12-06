import { FormGroup } from "@angular/forms";

import { BaseComponent } from "../base.component";

export abstract class BaseFormComponent extends BaseComponent {
  public form: FormGroup;

  public abstract submit(): void;
  public abstract cancel(): void;
  protected abstract initForm(): void;
}
