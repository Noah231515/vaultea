import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';

import { GeneratePasswordComponent } from './generate-password.component';

describe('GeneratePasswordComponent', () => {
  let component: GeneratePasswordComponent;
  let fixture: ComponentFixture<GeneratePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePasswordComponent ],
      providers: [FormBuilder]
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

    console.log(generatedPassword)
    expect(generatedPassword.length).toEqual(component.form.get("length").value)
  });
});
