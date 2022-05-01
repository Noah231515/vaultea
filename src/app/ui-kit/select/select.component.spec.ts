import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { SelectData } from "./select-data.interface";
import { SelectComponent } from "./select.component";

describe("SelectComponent", () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ],
      imports: [
        MatSelectModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    const selectData: SelectData = {
      options: [],
      label: "Test",
      formControl: new FormControl()
    }
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.selectData = selectData;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
