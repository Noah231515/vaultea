import { startWith } from "rxjs/operators";

import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BaseFormComponent } from "@ui-kit";

@Component({
  selector: "vaultea-generate-password",
  templateUrl: "./generate-password.component.html",
  styleUrls: ["./generate-password.component.scss"]
})
export class GeneratePasswordComponent extends BaseFormComponent implements OnInit {
  @Output() public passwordAccepted: EventEmitter<string> = new EventEmitter<string>();
  @Output() public cancelButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  public numeric: string[] = [];
  public upperAlpha: string[] = [];
  public lowerAlpha: string[] = [];
  public simpleSpecial: string[] = "!#$%&*+-:;?@".split("");
  // eslint-disable-next-line
  public complexSpecial: string[] = "/,.'()<=>[\]^_`{|}~".split("");

  public numericRange: [number, number] = [48,57];
  public upperAlphaRange: [number, number] = [65,90];
  public lowerAlphaRange: [number, number] = [97,122];

  
  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) { 
    super();
  }
  
  ngOnInit(): void {
    this.numeric = this.generateSet(this.numericRange)
    this.upperAlpha = this.generateSet(this.upperAlphaRange);
    this.lowerAlpha = this.generateSet(this.lowerAlphaRange);

    this.initForm();
    this.changeDetectorRef.markForCheck();
  }
  
  protected initForm(): void {
    this.form = this.formBuilder.group({
      length: [24, [Validators.required, Validators.min(1), Validators.max(144)]],
      useLowerAlpha: true,
      useUpperAlpha: true,
      useNumeric: true,
      useSimpleSpecial: true,
      useComplexSpecial: false,
      generatedPassword: ""
    });

    this.form
      .valueChanges
      .pipe(
        startWith(this.form.getRawValue())
      )
      .subscribe(() => {
        const rawValue = this.form.getRawValue();

        if (
          this.form.valid 
          && rawValue.useLowerAlpha
          || rawValue.useUpperAlpha
          || rawValue.useNumeric
          || rawValue.useSimpleSpecial
          || rawValue.useComplexSpecial
        ) {
          this.form.get("generatedPassword").patchValue(this.generatePassword(), { emitEvent: false });
        } else {
          this.form.get("generatedPassword").patchValue("", { emitEvent: false })
        }
      })
  }
  
  public generatePassword(): string {
    const sets = [];
    const rawValue = this.form.getRawValue();

    if (rawValue.useUpperAlpha) {
      sets.push(this.upperAlpha)
    }

    if (rawValue.useLowerAlpha) {
      sets.push(this.lowerAlpha);
    }

    if (rawValue.useNumeric) {
      sets.push(this.numeric);
    }

    if (rawValue.useSimpleSpecial) {
      sets.push(this.simpleSpecial);
    }

    if (rawValue.useComplexSpecial) {
      sets.push(this.complexSpecial);
    }

    const generatedPassword = [];
    for (let i = 0; i < rawValue.length; i++) {
      const randomValueArray = new Uint32Array(1);
      crypto.getRandomValues(randomValueArray);

      // Select character set randomly
      const randomSetIndex = randomValueArray[0] % sets.length;
      const randomSet = sets[randomSetIndex];

      // Select character randomly
      crypto.getRandomValues(randomValueArray);
      const randomValueIndex = randomValueArray[0] % randomSet.length;

      // Push randomly selected value into array
      const randomValue = randomSet[randomValueIndex];
      generatedPassword.push(randomValue);
    }

    return generatedPassword.join("");
  }

  private generateSet(range: [number, number]): string[] {
    const result = [];
    for (let i = range[0]; i <= range[1]; i++) {
      result.push(String.fromCharCode(i));
    }
    return result;
  }

  public generateAnotherPassword(): void {
    this.form.get("generatedPassword").patchValue(this.generatePassword());
  }

  public submit(): void {
    this.passwordAccepted.emit(this.form.get("generatedPassword").value);
  }

  public cancel(): void {
    this.cancelButtonClicked.emit();
  }
  
  public setState(): void {
    throw new Error("Method not implemented.");
  }
}
