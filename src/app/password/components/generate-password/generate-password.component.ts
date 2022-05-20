import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from '@ui-kit';

@Component({
  selector: 'vaultea-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss']
})
export class GeneratePasswordComponent extends BaseFormComponent implements OnInit {
  @Output() public passwordGenerated: EventEmitter<string> = new EventEmitter<string>();

  public numeric: string[] = [];
  public upperAlpha: string[] = [];
  public lowerAlpha: string[] = [];

  public numericRange: [number, number] = [48,57];
  public upperAlphaRange: [number, number] = [65,90];
  public lowerAlphaRange: [number, number] = [97,122];

  
  constructor(private formBuilder: FormBuilder) { 
    super();
  }
  
  ngOnInit(): void {
    this.numeric = this.generateSet(this.numericRange)
    this.upperAlpha = this.generateSet(this.upperAlphaRange);
    this.lowerAlpha = this.generateSet(this.lowerAlphaRange);

    this.initForm();
  }
  
  protected initForm(): void {
    this.form = this.formBuilder.group({
      length: [50, Validators.required],
      useLowerAlpha: true,
      useUpperAlpha: true,
      useNumeric: true,
      useSimpleSpecial: true,
      useComplexSpecial: true,
    });
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
  
  public setState(): void {
    throw new Error('Method not implemented.');
  }
  public submit(): void {
    throw new Error('Method not implemented.');
  }
  public cancel(): void {
    throw new Error('Method not implemented.');
  }
}
