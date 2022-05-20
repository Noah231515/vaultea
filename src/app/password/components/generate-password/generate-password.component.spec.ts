import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';

import { GeneratePasswordComponent } from './generate-password.component';

describe('GeneratePasswordComponent', () => {
  let component: GeneratePasswordComponent;
  let fixture: ComponentFixture<GeneratePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePasswordComponent ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a password of the specified length', () => {
    component.ngOnInit();
    component.form.get("length").patchValue(50);
    const generatedPassword = component.generatePassword();

    expect(generatedPassword.length).toEqual(component.form.get("length").value)
  });

  it('should generate a password with only numeric', () => {
    component.ngOnInit();
    component.form.patchValue({
      length: 50,
      useLowerAlpha: false,
      useUpperAlpha: false,
      useNumeric: true,
      useSimpleSpecial: false,
      useComplexSpecial: false,
    });

    const generatedPassword = component.generatePassword();
    const parts = generatedPassword.split("");

    parts.forEach(value => {
      expect(component.numeric.includes(value)).toBeTruthy()
    })
  });

  it('should generate a password with only upperAlpha', () => {
    component.ngOnInit();
    component.form.patchValue({
      length: 50,
      useLowerAlpha: false,
      useUpperAlpha: true,
      useNumeric: false,
      useSimpleSpecial: false,
      useComplexSpecial: false,
    });

    const generatedPassword = component.generatePassword();
    const parts = generatedPassword.split("");

    parts.forEach(value => {
      expect(component.upperAlpha.includes(value)).toBeTruthy()
    })
  });

  it('should generate a password with only lowerAlpha', () => {
    component.ngOnInit();
    component.form.patchValue({
      length: 50,
      useLowerAlpha: true,
      useUpperAlpha: false,
      useNumeric: false,
      useSimpleSpecial: false,
      useComplexSpecial: false,
    });

    const generatedPassword = component.generatePassword();
    const parts = generatedPassword.split("");

    parts.forEach(value => {
      expect(component.lowerAlpha.includes(value)).toBeTruthy()
    })
  });

  it('should not generate two different passwords in a row', () => {
    component.ngOnInit();
    component.form.get("length").patchValue(50);
    const generatedPassword1 = component.generatePassword();
    const generatedPassword2 = component.generatePassword();

    expect(generatedPassword1 === generatedPassword2).toEqual(false);
  });
});
