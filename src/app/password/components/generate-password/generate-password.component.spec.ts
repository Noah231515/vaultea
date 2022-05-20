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
    const formBuilder = TestBed.inject(FormBuilder)
    component = fixture.componentInstance;
    component.form = formBuilder.group({
      length: [1, Validators.required],
      useLowerAlpha: true,
      useUpperAlpha: true,
      useNumeric: true,
      useSimpleSpecial: true,
      useComplexSpecial: true,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a password of the specified length', () => {

  });
});
