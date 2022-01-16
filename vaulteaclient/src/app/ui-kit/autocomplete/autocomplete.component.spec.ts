import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AutocompleteOption } from "./autocomplete-option.interface";
import { AutocompleteComponent } from "./autocomplete.component";

describe("AutocompleteComponent", () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;
  const formControl = new FormControl();
  const options: AutocompleteOption[] = [
    {
      displayValue: "Value 1",
      value: "1"
    },
    {
      displayValue: "Milk Man",
      value: "2"
    },
    {
      displayValue: "Torpedoes 100,000",
      value: "3"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    component.autocompleteData = {
      label: "Test",
      options: options,
      formControl: formControl,
      required: false
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show all values initially", () => {
    component.ngOnInit();
    //formControl.setValue("milk");
    component.autocompleteData.formControl.setValue("milk");
    fixture.detectChanges();
    component.filteredOptions.subscribe(values => {
      const results = document.querySelectorAll("mat-option");
      expect(results.length).toEqual(3);
      //expect(values.length).toEqual(3);
    });
  });

  it("should get the correct display value", () => {
    const displayValue = component.getDisplayValue("3");
    expect(displayValue).toEqual("Torpedoes 100,000");
  });

  it("should return a blank value", () => {
    const displayValue = component.getDisplayValue("a non existent value");
    expect(displayValue).toEqual("");
  });
});
