import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SelectData } from "./select-data.interface";
import { SelectComponent } from "./select.component";

describe("SelectComponent", () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ],
      imports: [
        BrowserAnimationsModule,
        MatSelectModule
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
