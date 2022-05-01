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
  let formControl: FormControl;
  const options: AutocompleteOption[] = [
    {
      displayValue: "Value 1",
      value: "1",
      subtitle: "laz"
    },
    {
      displayValue: "Milk Man",
      value: "2",
      subtitle: "corn town"
    },
    {
      displayValue: "Torpedoes 100,000",
      value: "3",
      subtitle: "silver dollar"
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
    formControl = new FormControl();
    component = fixture.componentInstance;
    component.autocompleteData = {
      label: "Test",
      options: options,
      formControl: formControl,
      required: false,
      displaySubtitle: false
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show all values initially", () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.filteredOptions.subscribe(values => {
      expect(values.length).toEqual(3);
    });
  });

  it("should filter the values correctly based on displayValue", () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.filteredOptions.subscribe(values => {
      if (values.length != 3) {
        expect(values).toEqual([options[1]]);
      }
    });

    formControl.setValue("mi");
  });

  it("should filter the values correctly based on subtitle", () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.filteredOptions.subscribe(values => {
      if (values.length != 3) {
        expect(values).toEqual([options[2]]);
      }
    });

    formControl.setValue("ar");
  });

  it("should filter the values correctly based on displayValue and subtitle", () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.filteredOptions.subscribe(values => {
      if (values.length != 3) {
        expect(values).toContain(options[0]);
        expect(values).toContain(options[2]);
      }
    });

    formControl.setValue("v");
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
