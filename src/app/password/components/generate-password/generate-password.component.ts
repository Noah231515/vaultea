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

  private numeric: string[] = [];
  private upperAlpha: string[] = [];
  private lowerAlpha: string[] = [];

  private numericRange: [number, number] = [48,57];
  private upperAlphaRange: [number, number] = [65,90];
  private lowerAlphaRange: [number, number] = [97,122];

  
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
      length: [1, Validators.required],
      useLowerAlpha: true,
      useUpperAlpha: true,
      useNumeric: true,
      useSimpleSpecial: true,
      useComplexSpecial: true,
    });
    this.generatePassword();
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
    for (let i = 0; i <= rawValue.length; i++) {
      // Select character set
      const randomValueArray = new Uint32Array(1);
      crypto.getRandomValues(randomValueArray);

      const characterSetIndex = randomValueArray[0] % sets.length;
      const randomSet = sets[characterSetIndex];

      crypto.getRandomValues(randomValueArray);
      const randomValueIndex = randomValueArray[0] & randomSet.length;

      const randomValue = randomSet[randomValueIndex];
      generatedPassword.push(randomValue);
    }

    // console.log(generatedPassword)
    return generatedPassword.join("");
    /** 
     * We should be able to choose length
     * And pick character set
     */

    /**
     * The general intuition here is
     * Based off the character sets that is given
     * We want to create an array of the length
     * For each value of the array we will pick a random number mod the length of the character sets 
     * F.ex if we're just using lower and upper then we pick a random number and mod 2 and that will give us our index
     * and then we will pick another random number and mod the length of our character set, that gives our random selection
     * we will randomly select for the length that has been picked
     */
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
